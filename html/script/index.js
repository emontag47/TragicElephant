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
    data: {
        restaurant: "",
        results: [
            {restaurant_name: "iHop",
             meals: [
                {allergens: ["sesame", "sausage"],
                 description: "A sausage muffin thing that flies on wenesdays and knows who your mother is"},
                {allergens: ["egg", "almonds"],
                 description: "Almond shaving omelet"},
                {allergens: [],
                 description: "A completely allergy-free pancake"}
             ]},
             {restaurant_name: "MI Burger",
              meals: [
                {allergens: ["wheat"],
                 description: "A plain hamburger"},
                {allergens: ["bacon", "cheese"],
                 description: "A bacon hamburger"},
                {allergens: ["egg"],
                 description: "French fries"}
             ]}

        ]
    },
    methods: {
        async search() {
            const {url} = window.location.href
            console.log("Searched");
            console.log(this.restaurant);
            fetch("http://127.0.0.1:8000/api/" + this.restaurant + "/")
                .then((response) => {
                    console.log(response);
                this.results = response.json();
                console.log(this.results);
                })
                .catch((error) =>{
                    console.log(error);
                });
        },
        test(index) {
            console.log(index);
        }
    }
});


