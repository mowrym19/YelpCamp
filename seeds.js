var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
	{
		name: "Sandy Bottom",
		image: "https://cdn.pixabay.com/photo/2016/09/05/12/48/camping-1646504_960_720.jpg",
		author: "YelpCamp",
		price: 12.00,
		description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
	},
	{
	name: "Wooded Seclusion",
		image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg",
		author: "YelpCamp",
		price: 8.50,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Murder Forest",
		image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg",
		author: "Camping dude",
		price: 9.99,
		description: "Murdery. In a forest."
	}
];

function seedDB(){
	//delete all campgrounds
Campground.deleteMany({}, function(err){
	if(err){
		console.log(err);
}	
	console.log("removed campgrounds");
	//add a few campgrounds
data.forEach(function(seed){
	Campground.create(seed, function(err, campground){
		if(err){
			console.log(err);
}		else {
			console.log("added a campground");
			Comment.create(
				{
					text: "This place is great but I wish it had internet",
					author: "Homer"
				}, function(err, comment){
					if(err){
						console.log(err);
				}	else {
					campground.comments.push(comment);
					campground.save();
					console.log("Created new comment");
			 	}
	});
	
}
});
});
	
});
}





module.exports = seedDB;