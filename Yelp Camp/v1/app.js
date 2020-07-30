var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var campgrounds = [
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg" },
    { name: "Granite Hill", image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg" }
]

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name //from name="name"
    var image = req.body.image
    var newCampground = { name: name, image: image }
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})

app.listen(3000, () => {
    console.log("The YelpCamp server has started");
});