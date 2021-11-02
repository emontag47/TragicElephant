// Declare global variables for input
var allergies = ["sesame", "treenut", "peanut", "soybean",
             "milk", "egg", "shellfish", "fish", "wheat"];
var input = {selection: []};

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



var app = new Vue({
    el: "#app",
    data: {
        results: [
            {url: "mgoblue.com", distance: "3.4 miles"},
            {url: "mgoblue.com", distance: "3.4 miles"},
            {url: "mgoblue.com", distance: "3.4 miles"},
            {url: "mgoblue.com", distance: "3.4 miles"}
        ]
    }
});


