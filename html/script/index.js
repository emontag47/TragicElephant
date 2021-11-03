// Declare global variables for input
var allergies = ["sesame", "treenut", "peanut", "soybean",
             "milk", "egg", "shellfish", "fish", "wheat"];
var input = {selection: []};


/*
$("#search").click(function () {
    currentSelection = [];
    input.selection = [];
    for (var i = 0; i < allergies.length; i++) {
        if ($("#" + allergies[i]).is(":checked")){
            input.selection.push(allergies[i]);
        }
    }
    var json = JSON.stringify(input);
    // Call an API here
});
*/


var app = new Vue({
    el: "#app",
    data: 
        {displayResults: false,
         restaurant: "",
         results: [
{
  "restaurant_name": "Fleetwood Diner",
  "meals": {
    "all day breakfast special": {
      "allergens": [
        "eggs",
        "ham",
        "bacon",
        "sausage"
      ],
      "description": "2 eggs any style with sausage, bacon or ham, hash browns, toast and jelly."
    },
    "1. homemade corned beef hash": {
      "allergens": [
        "eggs"
      ],
      "description": "with 2 eggs, toast and jelly."
    },
    "2. two eggs any style with meat": {
      "allergens": [
        "eggs",
        "ham",
        "bacon",
        "sausage"
      ],
      "description": "with 2 sausage, 2 bacon, 1 slice of ham, hash browns, toast and jelly."
    },
    "3. two eggs any style and hash browns": {
      "allergens": [
        "eggs"
      ],
      "description": "with hash browns, toast and jelly."
    },
    "4. two scrambled eggs": {
      "allergens": [
        "eggs"
      ],
      "description": "with green onions, toast and jelly."
    },
    "5. two scramble eggs with ham": {
      "allergens": [
        "eggs",
        "ham"
      ],
      "description": "with ham, green onions, toast and jelly."
    },
    "6. 3 pancakes": {
      "allergens": [],
      "description": ""
    },
    "6. six french toast halves": {
      "allergens": [],
      "description": ""
    },
    "7. three pancakes with meat": {
      "allergens": [
        "ham",
        "bacon",
        "sausage"
      ],
      "description": "with ham, bacon or sausage."
    },
    "7. six french toast halves with meat": {
      "allergens": [
        "ham",
        "bacon",
        "sausage"
      ],
      "description": "with ham, bacon or sausage."
    },
    "8. short stack (2 pancakes)": {
      "allergens": [
        "eggs",
        "ham",
        "bacon",
        "sausage"
      ],
      "description": "with 2 eggs any style, 2 bacon, 2 sausage and 1 slice of ham."
    },
    "9. pork chops or steak and eggs": {
      "allergens": [
        "eggs",
        "steak"
      ],
      "description": "choice of pork chops or steak with 2 eggs any style, hash browns, toast and jelly."
    },
    "10. greek breakfast": {
      "allergens": [
        "eggs"
      ],
      "description": "gyro meat, 2 eggs, hash browns, toast and jelly."
    },
    "11. chicken breast and eggs": {
      "allergens": [
        "eggs",
        "chicken"
      ],
      "description": "with 2 eggs any style, hash browns, toast and jelly."
    },
    "ham, bacon, or sausage omelette": {
      "allergens": [
        "ham",
        "bacon",
        "sausage"
      ],
      "description": ""
    },
    "country omelette": {
      "allergens": [
        "eggs",
        "bacon"
      ],
      "description": "bacon, green peppers, onions and tomatoes. made with 2 eggs and served with hash browns, toast and jelly."
    },
    "gyro omelette": {
      "allergens": [
        "eggs",
        "cheese"
      ],
      "description": "gyro meat, tomatoes, onions and feta cheese. made with 2 eggs and served with hash browns, toast and jelly."
    },
    "western omlette": {
      "allergens": [
        "eggs",
        "ham"
      ],
      "description": "ham, green peppers and onions. made with 2 eggs and served with hash browns, toast and jelly."
    },
    "farmer's omelette": {
      "allergens": [
        "sausage"
      ],
      "description": "sausage, green peppers, onions and hash browns inside."
    },
    "all meat omelette": {
      "allergens": [
        "ham",
        "bacon",
        "sausage",
        "cheese"
      ],
      "description": "ham, bacon and sausage omelette with choice of cheese."
    },
    "cheese omelette": {
      "allergens": [
        "cheese"
      ],
      "description": "3 egg omelette prepared with choice of cheese."
    },
    "mushroom omelette": {
      "allergens": [],
      "description": ""
    },
    "broccoli omelette": {
      "allergens": [],
      "description": ""
    },
    "onion and tomato omelette": {
      "allergens": [],
      "description": ""
    },
    "veggie omelette": {
      "allergens": [],
      "description": "onions, tomatoes and broccoli."
    },
    "spinach and feta cheese omelette": {
      "allergens": [
        "cheese"
      ],
      "description": ""
    },
    "tempeh omelette": {
      "allergens": [],
      "description": "with tempeh, green peppers, onions and tomatoes."
    },
    "healthy omelette": {
      "allergens": [],
      "description": "4 egg whites with broccoli, green peppers, onions and tomatoes."
    },
    "the original hippie hash breakfast": {
      "allergens": [
        "eggs",
        "cheese"
      ],
      "description": "hash browns topped with grilled green peppers, onions, tomatoes, broccoli, mushrooms and feta cheese. served with 2 eggs any style, toast and jelly."
    },
    "gyro hippie hash breakfast": {
      "allergens": [
        "eggs",
        "cheese"
      ],
      "description": "hash browns with gyro mixed in, topped with grilled green peppers, onions, tomatoes, broccoli, mushrooms and feta cheese. served with 2 eggs any style, toast and jelly."
    },
    "meaty hippie hash breakfast": {
      "allergens": [
        "eggs",
        "cheese"
      ],
      "description": "hash browns with corned beef, topped with grilled green peppers, onions, tomatoes, broccoli, mushrooms and feta cheese. served with 2 eggs any style, toast and jelly."
    },
    "tempeh hippie hash breakfast": {
      "allergens": [
        "eggs",
        "cheese"
      ],
      "description": "hash browns with tempeh mixed in, topped with grilled green peppers, onions, tomatoes, broccoli, mushrooms and feta cheese. served with 2 eggs any style, toast and jelly."
    },
    "chicken hippie hash breakfast": {
      "allergens": [
        "eggs",
        "chicken"
      ],
      "description": "with grilled chicken mixed in, two eggs any style and toast."
    },
    "breakfast sandwich": {
      "allergens": [
        "eggs",
        "ham",
        "bacon",
        "sausage"
      ],
      "description": "choice of ham, bacon, or sausage served with eggs, lettuce, tomatoes and mayo."
    },
    "hippie hash": {
      "allergens": [],
      "description": ""
    },
    "gyro hippie hash": {
      "allergens": [],
      "description": ""
    },
    "meaty hippie hash": {
      "allergens": [],
      "description": ""
    },
    "tempeh hippie hash": {
      "allergens": [],
      "description": ""
    },
    "chicken hippie hash": {
      "allergens": [
        "chicken"
      ],
      "description": ""
    },
    "1 egg": {
      "allergens": [],
      "description": ""
    },
    "2 eggs": {
      "allergens": [
        "eggs"
      ],
      "description": ""
    },
    "sausage": {
      "allergens": [
        "sausage"
      ],
      "description": ""
    },
    "bacon": {
      "allergens": [
        "bacon"
      ],
      "description": ""
    },
    "ham": {
      "allergens": [
        "ham"
      ],
      "description": ""
    },
    "hash browns": {
      "allergens": [],
      "description": ""
    },
    "1/2 order of pancake": {
      "allergens": [],
      "description": ""
    },
    "1/2 order of french toast": {
      "allergens": [],
      "description": ""
    },
    "gyro meat": {
      "allergens": [],
      "description": ""
    },
    "corned beef hash": {
      "allergens": [],
      "description": ""
    },
    "rye roast": {
      "allergens": [],
      "description": ""
    },
    "white toast": {
      "allergens": [],
      "description": ""
    },
    "wheat toast": {
      "allergens": [
        "wheat"
      ],
      "description": ""
    },
    "english muffin": {
      "allergens": [],
      "description": ""
    },
    "1/2 order of pancake with meat": {
      "allergens": [],
      "description": ""
    },
    "1/2 order of french toast with meat": {
      "allergens": [],
      "description": ""
    },
    "oatmeal": {
      "allergens": [],
      "description": ""
    },
    "the greek chicken salad": {
      "allergens": [
        "chicken",
        "cheese"
      ],
      "description": "grilled strips of chicken breast on a bed of lettuce with tomatoes, olives, pepperoncini and feta cheese, served with pita bread."
    },
    "greek salad": {
      "allergens": [],
      "description": ""
    },
    "chicken salad": {
      "allergens": [
        "chicken"
      ],
      "description": "sliced fried or grilled chicken strips on a bed of lettuce with tomatoes, green peppers and onions, served with pita bread."
    },
    "chef's salad": {
      "allergens": [
        "ham",
        "turkey",
        "cheese"
      ],
      "description": "ham, turkey, tomatoes, onions, green peppers, pepperoncini, swiss and american cheese, served with pita bread."
    },
    "tossed salad": {
      "allergens": [],
      "description": ""
    },
    "cole slaw": {
      "allergens": [],
      "description": ""
    },
    "reuben sandwich": {
      "allergens": [
        "cheese"
      ],
      "description": "corned beef with sauerkraut, 1000 island dressing and swiss cheese on grilled rye."
    },
    "tuerkey reuben sandwich": {
      "allergens": [
        "turkey",
        "cheese"
      ],
      "description": "turkey with cole slaw and swiss cheese on grilled rye."
    },
    "veggie reuben sandwich": {
      "allergens": [
        "cheese"
      ],
      "description": "veggies with sauerkraut, 1000 island dressing and swiss cheese on grilled rye."
    },
    "corned beef sandwich": {
      "allergens": [],
      "description": ""
    },
    "fried chicken sandwich": {
      "allergens": [
        "chicken"
      ],
      "description": ""
    },
    "b.l.t. sandwich": {
      "allergens": [],
      "description": ""
    },
    "grilled ham and cheese sadnwich": {
      "allergens": [
        "ham",
        "cheese"
      ],
      "description": ""
    },
    "grilled cheese sandwich": {
      "allergens": [
        "cheese"
      ],
      "description": ""
    },
    "fish sandwich": {
      "allergens": [],
      "description": ""
    },
    "tuna sandwich": {
      "allergens": [],
      "description": ""
    },
    "tuna pita sandwich": {
      "allergens": [],
      "description": "with lettuce, tomatoes, onion and mayo."
    },
    "tuna melt sandwich": {
      "allergens": [
        "cheese"
      ],
      "description": "tuna with grilled onion and swiss cheese on grilled rye."
    },
    "turkey sandwich": {
      "allergens": [
        "turkey"
      ],
      "description": ""
    },
    "turkey pita sandwich": {
      "allergens": [
        "turkey"
      ],
      "description": "with lettuce, tomatoes and mayo."
    },
    "steak sandwich": {
      "allergens": [
        "steak"
      ],
      "description": ""
    },
    "1/3 lb. burger": {
      "allergens": [],
      "description": "comes with lettuce, tomatoes, onions, pickle and mayo."
    },
    "1/3 lb. cheeseburger": {
      "allergens": [
        "cheese"
      ],
      "description": "comes with lettuce, tomatoes, onions, pickles and mayo."
    },
    "1/3 lb. bacon cheeseburger": {
      "allergens": [
        "bacon",
        "cheese"
      ],
      "description": "comes with lettuce, tomatoes, onions, pickles and mayo."
    },
    "tempeh burger": {
      "allergens": [],
      "description": "comes with lettuce, tomatoes, onions, pickles and mayo."
    },
    "1/3 lb. patty melt": {
      "allergens": [
        "ham",
        "cheese"
      ],
      "description": "hamburger patty with grilled onions and swiss cheese on grilled rye."
    },
    "coney dog": {
      "allergens": [],
      "description": "hot dog with chili, mustard and onion."
    },
    "hot dog": {
      "allergens": [],
      "description": ""
    },
    "1/2 and 1/2 burger": {
      "allergens": [
        "bacon"
      ],
      "description": "made of 50% ground bacon and 50% ground beef."
    },
    "gyro sandwiches": {
      "allergens": [],
      "description": "served off the skewer with onions, tomatoes and homemade gyro sauce."
    },
    "grille chicken pita": {
      "allergens": [
        "chicken"
      ],
      "description": "with lettuce, onion, tomatoes and gyro sauce."
    },
    "the fleetwood club": {
      "allergens": [
        "bacon",
        "chicken"
      ],
      "description": "grilled chicken breast with bacon, lettuce, tomatoes and onions on a pita."
    },
    "chicken strip pita.": {
      "allergens": [
        "chicken",
        "cheese"
      ],
      "description": "fried chicken strips with lettuce, tomatoes, swiss and american cheeses."
    },
    "veggie pita": {
      "allergens": [
        "cheese"
      ],
      "description": "lettuce, tomatoes, onions, green peppers, pickles and feta cheese on a pita, served with a side of gyro sace."
    },
    "the original club": {
      "allergens": [
        "bacon",
        "turkey"
      ],
      "description": "turkey breast with bacon, lettuce, tomatoes and mayo."
    },
    "tempeh (soy) reuben": {
      "allergens": [
        "soy"
      ],
      "description": "grilled tempeh with sauerkraut and grilled onion on rye bread."
    },
    "tempeh (soy) pita": {
      "allergens": [
        "soy",
        "cheese"
      ],
      "description": "grilled tempeh with lettuce, green peppers, tomatoes, onion pickle, feta cheese and gyro sauce on the side."
    },
    "gyro and baby greek salad combo": {
      "allergens": [],
      "description": ""
    },
    "ribeye steak dinner": {
      "allergens": [
        "steak"
      ],
      "description": ""
    },
    "pork chop dinner (2)": {
      "allergens": [],
      "description": ""
    },
    "hamburger steak dinner": {
      "allergens": [
        "ham",
        "steak"
      ],
      "description": ""
    },
    "gyro platter dinner": {
      "allergens": [],
      "description": "served with fries or hash browns and cole slaw."
    },
    "gyro platter and baby greek salad dinner": {
      "allergens": [],
      "description": ""
    },
    "chicken strip dinner (4)": {
      "allergens": [
        "chicken"
      ],
      "description": "served with fries or hash browns and cole slaw."
    },
    "fish and chips dinner": {
      "allergens": [],
      "description": ""
    },
    "chicken wings dinner (7)": {
      "allergens": [
        "chicken"
      ],
      "description": "served with fries or hash browns and cole slaw."
    },
    "japapeno poppers (5)": {
      "allergens": [],
      "description": ""
    },
    "basket of fries": {
      "allergens": [],
      "description": ""
    },
    "1/2 basket of fries": {
      "allergens": [],
      "description": ""
    },
    "chili fries": {
      "allergens": [],
      "description": ""
    },
    "chili cheese fries": {
      "allergens": [
        "cheese"
      ],
      "description": ""
    },
    "onion rings": {
      "allergens": [],
      "description": ""
    },
    "fried mushrooms": {
      "allergens": [],
      "description": ""
    },
    "mozzarella cheese sticks (6)": {
      "allergens": [
        "cheese"
      ],
      "description": ""
    },
    "chicken strips (4)": {
      "allergens": [
        "chicken"
      ],
      "description": ""
    },
    "chicken wings": {
      "allergens": [
        "chicken"
      ],
      "description": ""
    },
    "tomato slices (4)": {
      "allergens": [],
      "description": ""
    },
    "bowl of coney chili": {
      "allergens": [],
      "description": ""
    },
    "extra dressing": {
      "allergens": [],
      "description": ""
    },
    "personal pie": {
      "allergens": [],
      "description": "please contact the restaurant for the seasonal selection."
    }
  }
}

        ]}
    ,
    methods: {
        async search() {
            const {url} = window.location.href
            this.displayResults = true;
            console.log(this.restaurant);
            /*
            fetch("http://127.0.0.1:8000/api/" + this.restaurant + "/")
                .then((response) => {
                    console.log(response);
                    this.results = response.json();
                    console.log(this.results);
                })
                .catch((error) =>{
                    console.log(error);
                });
                */
             
        },
        checkDisplay() {
            return this.displayResults;
        }
    }
});


