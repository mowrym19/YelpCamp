var express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	mongoose = require("mongoose"),
	middleware = require("../middleware");

mongoose.set('useFindAndModify', false);

//Show all campgrounds
router.get('/', function(req, res){
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
}		else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
			 }

});
});

//New- form to create new campground
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//Create - add new campground to db
router.post('/', middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
};
	var newCampground = {name: name, image: image, description: desc, author: author};
//Create new campground and save to DB
Campground.create(newCampground, function(err, newlyCreated){
	if(err){
		console.log(err);
}	else {
		console.log(newlyCreated);
		res.redirect("/campgrounds");
}
});
});

router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
}		else {
		console.log(foundCampground);
		res.render("campgrounds/show", {campground: foundCampground});
}
});
});

//Edit Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});	
});

//Update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");	
		}	else {
		//redirect somewhere
		res.redirect("/campgrounds/"+ req.params.id);
		}
});
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err){
			if(err){
			res.redirect("/campgrounds");
}		else {
			res.redirect("/campgrounds");
}
});
});





module.exports = router;
