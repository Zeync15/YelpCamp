var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image:
//       "https://www.campsitephotos.com/photo/camp/65199/Maplewood_Lake_View_2.jpg",
//     description:
//       "This is a huge granite hill, no bathroon. No water. Beautiful granite!"
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly Created Campground: ");
//       console.log(campground);
//     }
//   }
// );

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  //get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  //Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page-
      res.redirect("/campgrounds");
    }
  });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs");
});

//SHOW - shows more info abount one campground
app.get("/campgrounds/:id", function (req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000, function () {
  console.log("The YelpCamp server has started");
});
