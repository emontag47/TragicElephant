// Declare global variables for input
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
         allergies: [
            {allergy: "sesame", checked: 0},
            {allergy: "treenut", checked: 0},
            {allergy: "peanut", checked: 0},
            {allergy: "soybean", checked: 0},
            {allergy: "milk", checked: 0},
            {allergy: "egg", checked: 0},
            {allergy: "shellfish", checked: 0},
            {allergy: "fish", checked: 0},
            {allergy: "wheat", checked: 0}],
         results: [
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

        ]}
    ,
    methods: {
        async search() {
            const {url} = window.location.href
            // Show dummy results
            this.displayResults = true;
            
            // Go through checklist to see what is checked
            var weeders = []
            for (let i = 0; i < this.allergies.length; i++) {
                if (this.allergies[i].checked % 2 !== 0){
                    weeders.push(this.allergies[i].allergy);
                }
            }
            // Create search string
            var search = this.restaurant + "/";
            // Check if need to query specific foods
            if (weeders.length > 0){
                search += "allergy?";
                for (let i = 0; i < weeders.length; i++){
                    search += ("q=" + weeders[i] + "&");
                }
                // Remove last '&'
                search = search.slice(0, -1);
            }
            
            // Make call to API  
            fetch("http://127.0.0.1:8000/api/" + search)
                .then((response) => {
                    console.log(response);
                    this.results = response.json();
                    console.log(this.results);
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


