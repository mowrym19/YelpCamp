//all middleware goes here

var middlewareObj = {},
	Campground = require("../models/campground"),
	Comment = require("../models/comment");



middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
	}	else {
		//added to check if foundCampground exists and send back to campgrounds if not
		 if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
		 }
		//does user own campground?
		if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
			next();
		} else {
			req.flash("error", "You do not have permission to do that");
			res.redirect("back");
		}
		}
	});	
							
							
}	else {
		req.flash("error", "You must be logged in to do that");
		res.redirect("back");
}
};



middlewareObj.checkCommentAuthor = function(req, res, next){
if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found");
				res.redirect("back");
		} else {
			if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
			next();
	   } else {
		   req.flash("error", "You do not have permission to do that");
		   res.redirect("back");
}	
		}
});
}
	else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}	

};


module.exports = middlewareObj;

