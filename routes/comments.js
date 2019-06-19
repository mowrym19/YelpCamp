var express = require("express"),
	router = express.Router({mergeParams: true}),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	mongoose = require("mongoose"),
	middleware = require("../middleware");

mongoose.set('useFindAndModify', false);


//new comment

router.get("/new", middleware.isLoggedIn, function(req, res){
	//find campground by ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
}		else {
	//send to add comment page
			res.render("comments/new", {campground: campground});
}
});
});

router.post("/", middleware.isLoggedIn, function(req, res){
//look up campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
}		else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
}				else{
				//add username and id to comment
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				//save comment
				comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added new comment");
					res.redirect("/campgrounds/" + campground._id);
}
});
}
});
});

//Edit Comment
router.get("/:comment_id/edit", middleware.checkCommentAuthor, function(req, res){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
		} else {
			   res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
	   }
		});
});

//Update Comment
router.put("/:comment_id", middleware.checkCommentAuthor, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
}
});
});

//Delete Comment
router.delete("/:comment_id", middleware.checkCommentAuthor, function(req, res){
	Comment.findByIdAndDelete(req.params.comment_id, function(err){
		if(err) {
			console.log(err);
			res.redirect("back");
}		else
			req.flash("success", "Deleted comment");
			res.redirect("/campgrounds/" + req.params.id);
});
});


	   




module.exports = router;

