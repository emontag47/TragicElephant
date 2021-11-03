"""REST API for TragicElephant"""

from fastapi import FastAPI, Body, HTTPException, status
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


# Base root returns the names of all of the restaurants in the database
@app.get("/", response_description="List all restaurants")
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
    print("HELLO")
    # Return 404 if the restaurant is not in our database
    if (x := mycol.find_one({"restaurant_name": { "$regex": restaurant, "$options" :'i' }}, {"_id": 0})) is None:
      raise HTTPException(status_code=404, detail=f"Restaurant {restaurant} not found")

    # Sort through data from the database to format data and return info above
    meals = {}
    for a in x["menus"]:
      for b in a["menu_sections"]:
        for i in b["menu_items"]:
          newMeal = i["name"].lower()
          newDesc = i["description"].lower()
          fullMeal = "{} {}".format(newMeal, newDesc)
          meals[newMeal] = {"allergens": [], "description": newDesc}
          for allergen in allergens:
            if fullMeal.find(allergen) > -1:
              meals[newMeal]["allergens"].append(allergen)
    
    info = {
      "restaurant_name": x["restaurant_name"],
      "meals": meals
    }
    # print(info)

    return info