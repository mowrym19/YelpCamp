var express = require("express");
var router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

//Index route
router.get('/', function(req, res){
	res.render("landing");
});


//Register form
router.get("/register", function(req, res){
	res.render("register");
});

//register logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	// if(req.body.adminCode === "secretcode123"){
	// 	newUser.isAdmin = true;
	// }
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("register");
}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp, " + user.username);
			res.redirect("/campgrounds");
});
});
});

//login form
router.get("/login", function(req, res){
	res.render("login");
});

//login logic - route, middleware, callback
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),
function(req, res){
	
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});



module.exports = router;
