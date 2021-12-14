"""REST API for TragicElephant"""

from fastapi import FastAPI, Body, HTTPException, status, Query
from pymongo import MongoClient
from pprint import pprint
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from bson import ObjectId
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#test

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Handling MongoDB connection 
myclient = MongoClient("mongodb://localhost:27017/")
mydb = myclient["local"]
mycol = mydb["Restaurants4"]

# List of allergens to check against 
allergens = ["milk", "eggs", "bass", "salmon", "cod", "crab", "lobster", "shrimp", "almonds", "walnuts", "pecans", "peanuts", "wheat", "soy", "ham", "bacon", "sausage", "steak", "chicken", "turkey", "cheese", "sunflower", "sesame", "poppy"]
allergensDict = {
  "dairy": ["caesar", "cheese", "milk", "yogurt", "butter", "cream", "mayonnaise", "mozzarella", "cheddar", "parmesan", "gouda", "swiss", "brie", "pepper jack", "montery jack", "provolone", "asiago", "latte", "macchiato", "cappuccino", "chocolate"],
  "cheese": ["mozzarella", "cheddar", "parmesan", "gouda", "swiss", "brie", "feta", "pepper jack", "montery jack", "provolone", "asiago"],
  "egg": ["caesar", "waffles", "pancakes", "eggs", "eggnog", "mayonnaise", "omelette", "pudding", "custard", "hollandaise", "french toast", "ice cream", "marshmallow", "meatballs", "sorbet", "tortilla"],
  "fish": ["caesar", "bass", "salmon", "tilapia", "cod", "tuna", "seafood"],
  "shellfish": ["shrimp", "crab", "lobster", "crayfish", "seafood"],
  "peanut": ["peanuts"],
  "tree nuts": ["almonds", "brazil nuts", "cashews", "chestnuts", "hazelnuts", "macadamia", "pecans", "pine", "pistachios", "walnuts"],
  "soybean": ["tofu"],
  "meat": ["chicken", "steak", "pepperoni", "turkey", "bacon", "pork", "ribs", "pastrami", "gabagool", "capicola", "duck", "beef", "lamb", "venison", "ham", "veal", "meatballs", "wings"],
  "sunflower": [],
  "sesame": [],
  "poppy": [],
  "wheat": ["toast", "bread", "pancake", "pancakes", "biscuit", "bun", "sandwich", "bagel", "brioche", "ciabatta", "muffin", "brownie", "flour"]
}
# Models to handle BSON data returned by MongoDB
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class RestaurantModel(BaseModel):

    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    restaurant_name: str
    restaurant_website: str
    hours: str
    price_range: str
    price_range_num: int
    restaurant_id: int
    cuisines: list
    menus: list
    last_updated: str

class RestaurantModelNew(BaseModel):

    restaurant_name: str

class OneRestaurantModel(BaseModel):
    
    restaurant_name: str
    meals: dict

# Add Restaurant phone and website


# Base root returns the names of all of the restaurants in the database
@app.get("/api/restaurants", response_description="List all restaurants")
def get_list_of_restaurants():
    """returns the names of all of the restaurants in the database"""

    info = []
    for x in mycol.find({"price_range_num":{'$gte':0}}, {"_id": 0}):
      # print(x["restaurant_name"])
      info.append(x["restaurant_name"])
    return info

# Restaurant endpoint returns the restaurant name, meals, and potential allergens of the searched restaurant
@app.get("/api/{restaurant}/", response_description="Show meals from searched restaurant", response_model=OneRestaurantModel)
def get_restaurant(restaurant: str):
    """Returns the restaurant name, meals, and potential allergens of the searched restaurant"""
    # Return 404 if the restaurant is not in our database
    if (x := mycol.find_one({"restaurant_name": { "$regex": restaurant, "$options" :'i' }}, {"_id": 0})) is None:
      raise HTTPException(status_code=404, detail=f"Restaurant {restaurant} not found")

    # Sort through data from the database to format data and return info above
    info = get_restaurant_helper(x)

    return info

@app.get("/api/{restaurant}/allergy")
def get_restaurant_allergy(restaurant: str, q: Optional[List[str]] = Query(None)):
  """Returns meals from restaurant that don't contain selected allergens"""
  
  if (x := mycol.find_one({"restaurant_name": { "$regex": restaurant, "$options" :'i' }}, {"_id": 0})) is None:
      raise HTTPException(status_code=404, detail=f"Restaurant {restaurant} not found")

  info = get_restaurant_helper(x)
  
  meals = info["meals"]

  for meal in list(meals.keys()):
    print(meal)
    foundAllergen = False
    allergens = meals[meal]["allergens"]
    for i in q:
      if i in allergens:
        foundAllergen = True
    if foundAllergen:
      del meals[meal] 

  # for i in q:
  #   final.append(i)
  return info

def get_restaurant_helper(restaurant):

  # Sort through data from the database to format data and return info above
  meals = {}
  print("HELLLLO")
  for a in restaurant["menus"]:
    for b in a["menu_sections"]:
      for i in b["menu_items"]:
        newMeal = i["name"]
        newDesc = i["description"]
        fullMeal = "{} {}".format(newMeal.lower(), newDesc.lower())
        meals[newMeal] = {"allergens": [], "description": newDesc}
        for allergen in allergensDict:
          print(meals[newMeal])
          if allergen in fullMeal and allergen not in meals[newMeal]["allergens"]:
            print("Tragic", newMeal)
            if newMeal == "blend 333" or newMeal == "Blend 333":
                print("here", fullMeal, allergen)
            print(allergen)
            meals[newMeal]["allergens"].append(allergen)
          for i in allergensDict[allergen]:
            if i in fullMeal and allergen not in meals[newMeal]["allergens"]:
              print ("boeke", meals[newMeal], i)
              meals[newMeal]["allergens"].append(allergen)
  
  info = {
      "restaurant_name": restaurant["restaurant_name"],
      "meals": meals
    }

  return info