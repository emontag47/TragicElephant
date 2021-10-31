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

app = FastAPI()
myclient = MongoClient("mongodb://localhost:27017/")
mydb = myclient["local"]
mycol = mydb["Restaurants4"]
allergens = ["milk", "eggs", "bass", "salmon", "cod", "crab", "lobster", "shrimp", "almonds", "walnuts", "pecans", "peanuts", "wheat", "soy", "ham", "bacon", "sausage", "steak", "chicken", "turkey", "cheese"]

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

class OneRestaurantModel(BaseModel):
    
    restaurant_name: str
    meals: dict



@app.get("/", response_description="List all restaurants", response_model=List[RestaurantModel])
def read_root():

    info = []
    # mycol.find({"price_range_num":{'$gte':0}}, {"_id": 0})

    for x in mycol.find({"price_range_num":{'$gte':0}}, {"_id": 0}):
      print(x["restaurant_name"])
      info.append(x)
    # pprint(x)
    # print(x)
    # testO = {"Hello": [1, 2, 3, 4, 5]}
    # jsonItem = jsonable_encoder(x)

    return info

@app.get("/api/{restaurant}/", response_description="Show meals from searched restaurant", response_model=OneRestaurantModel)
def get_restaurant(restaurant: str):
    """Return food from restaurant"""

    if (x := mycol.find_one({"restaurant_name": restaurant}, {"_id": 0})) is None:
      raise HTTPException(status_code=404, detail=f"Restaurant {restaurant} not found")

    meals = {}
    for a in x["menus"]:
      for b in a["menu_sections"]:
        for i in b["menu_items"]:
          newMeal = "{} {}".format(i["name"], i["description"])
          newMeal = newMeal.lower()
          meals[newMeal] = []
          for allergen in allergens:
            if newMeal.find(allergen) > 0:
              meals[newMeal].append(allergen)
          # meals.append(newMeal)
    
    info = {
      "restaurant_name": restaurant,
      "meals": meals
    }

    return info