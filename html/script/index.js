// Declare global variables for input
var input = {selection: []};
/*
[
  "Panera Bread",
  "Subway",
  "Auntie Anne's",
  "Villa Fresh Italian Kitchen",
  "Wendy's",
  "Tian Chu",
  "Pita Kabob Grill",
  "Diag Pizza & Subs",
  "Ashley's Restaurant & Pub",
  "Ashley's",
  "Hunter House Hamburgers",
  "Iorio's Gelateria",
  "New York Pizza Depot",
  "Asian Legend",
  "The Original Cottage Inn",
  "Comet Coffee",
  "Espresso Royale",
  "NeoPapalis",
  "Bruegger's",
  "Noodles & Company",
  "Madras Masala",
  "Franks Restaurant",
  "Silvio's Organic Pizza",
  "Cottage Inn Pizza",
  "Jimmy John's",
  "Red Hawk Bar & Grill",
  "Yogurtrush",
  "Bert's Cafe",
  "Panera Bread",
  "Panera Bread",
  "Bruegger's Bagels",
  "Sushi",
  "Mama Satto",
  "Poke Poke - Sushi Unrolled",
  "Five Guys",
  "Amer's",
  "HopCat"
]
*/
/*
{
  "restaurant_name": "Jimmy John's",
  "meals": {
    "pepe": {
      "allergens": [
        "ham",
        "cheese"
      ],
      "description": "real applewood smoked ham and provolone cheese, garnished with lettuce, tomato, and mayo"
    },
    "sliced cucumber": {
      "allergens": [],
      "description": ""
    },
    "dijon mustard": {
      "allergens": [],
      "description": ""
    },
    "the j j gargantuan": {
      "allergens": [
        "ham",
        "turkey"
      ],
      "description": "this sandwich was invented by jimmy john's brother huey. it's huge enough to feed the hungriest of all humans tons of genoa salami, sliced smoked ham, capicola, toast beef, turkey and provolone, jammed into one of our homemade french buns then smothered with onions, mayo, lettuce, tomato and homemade italian dressing"
    }
  }
}
*/
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
         searchType: false,
         allergies: [
            {allergy: "sesame", checked: 0},
            {allergy: "tree nuts", checked: 0},
            {allergy: "peanuts", checked: 0},
            {allergy: "soybean", checked: 0},
            {allergy: "dairy", checked: 0},
            {allergy: "cheese", checked: 0},
            {allergy: "egg", checked: 0},
            {allergy: "shellfish", checked: 0},
            {allergy: "fish", checked: 0},
            {allergy: "meat", checked: 0},
            {allergy: "sunflower", checked: 0},
            {allergy: "wheat", checked: 0}],
         results: [  "Panera Bread",
  "Subway",
  "Auntie Anne's",
  "Villa Fresh Italian Kitchen",
  "Wendy's",
  "Tian Chu",
  "Pita Kabob Grill",
  "Diag Pizza & Subs",
  "Ashley's Restaurant & Pub",
  "Ashley's",
  "Hunter House Hamburgers",
  "Iorio's Gelateria",
  "New York Pizza Depot",
  "Asian Legend",
  "The Original Cottage Inn",
  "Comet Coffee",
  "Espresso Royale",
  "NeoPapalis",
  "Bruegger's",
  "Noodles & Company",
  "Madras Masala",
  "Franks Restaurant",
  "Silvio's Organic Pizza",
  "Cottage Inn Pizza",
  "Jimmy John's",
  "Red Hawk Bar & Grill",
  "Yogurtrush",
  "Bert's Cafe",
  "Panera Bread",
  "Panera Bread",
  "Bruegger's Bagels",
  "Sushi",
  "Mama Satto",
  "Poke Poke - Sushi Unrolled",
  "Five Guys",
  "Amer's",
  "HopCat"]
        },
    methods: {
        async search(intro) {
            const {url} = window.location.href
            // Show dummy results
            this.displayResults = true;
            this.searchType = false;
            console.log(this.searchType);
            // Go through checklist to see what is checked
            var weeders = []
            for (let i = 0; i < this.allergies.length; i++) {
                if (this.allergies[i].checked % 2 !== 0){
                    weeders.push(this.allergies[i].allergy);
                }
            }
            this.restaurant = intro;
            // Create search string
            var searchStr = this.restaurant + "/";
            // Check if need to query specific foods
            if (weeders.length > 0){
                searchStr += "allergy?";
                for (let i = 0; i < weeders.length; i++){
                    searchStr += ("q=" + weeders[i] + "&");
                }
                // Remove last '&'
                searchStr = searchStr.slice(0, -1);
            }
            
            var self = this;
            console.log(searchStr);
            if (searchStr == "/") {
                this.searchAll();
                return;
            }
            // Make call to API  
            console.log(self);
            fetch("http://127.0.0.1:8000/api/" + searchStr)
                .then((response) =>  response.json())
                .then(contents => {
                    var lisp = [];
                    lisp.push(contents);
                    self.results = lisp;
                    console.log(self.results);
                })
                .catch((error) =>{
                    console.log(error);
                });
                // console.log(obby);
        },
        searchAll() {
            this.searchType = true;
            this.displayResults = true;
            var self = this;
            this.restaurant = "";
            // Make call to API  
            fetch("http://127.0.0.1:8000/api/restaurants")
                .then((response) =>  response.json())
                .then(contents => {
                    // var lisp = [];
                    // lisp.push(contents);
                    self.results = contents;
                    
                    console.log(self.results);
                })
                .catch((error) =>{
                    console.log(error);
                });
        },
        checkDisplay() {
            return this.displayResults;
        },
    }
});


