Parse.initialize('QYwbmOOAAnRADjnUmKVJGv6dmoR156f3HRcd982D', 'CxTaXtOluIjRSXNh1amyrzCjC6MFbFDFsz4DoW1F');

var Review = Parse.Object.extend('Review')
$(function() {
	$('#stars').raty();
	$('#stars2').raty();
});
var totalRatings;
var numRatings;

$('form').submit(function(){
	var reviewItem = new Review();
	var title = $('#subject').val();
	var body = $('#review-input').val();
	var rating = $('#stars2').raty('score');

	reviewItem.set('title', title);
	reviewItem.set('body', body);
	reviewItem.set('rating', parseInt(rating));
	reviewItem.save();

	$('#subject').val('');
	$('#review-input').val('');
	$('#stars2').raty('score', 0);
	return false;
});

var getData = function() {
	totalRatings = 0;
	var query = new Parse.Query(Review);
	query.find({
		success:function(results) {
			buildList(results)
		}
	})
}

var buildList = function(data) {
	$("#list").empty();
	numRatings = data.length;
	data.forEach(function(d) {
		addItem(d);
	})
}

var addItem = function(item) {
	var title = item.get('title');
	var body = item.get('body');
	var rating = item.get('rating');
	totalRatings = totalRatings + rating;

	var div = $(document.createElement('div')).appendTo('#reviewPost');
	var postTitle = $(document.createElement('p')).text(title).appendTo(div);
	var postBody = $(document.createElement('p')).text(body).appendTo(div);
	var postRating = $(document.createElement('span')).raty({
		score: (item.get('rating'))
	}).appendTo(div);

	var button = $('<button class="btn-danger btn-xs">Remove</button>').appendTo(postTitle);
	button.click(function() {
		item.destroy({
			success:getData()
		});
	});

	var up = $('<button class="btn-success btn-xs">Like</button>');
	up.click(function() {
		item.increment('goUp');
		item.save();
	});
	up.appendTo(postTitle);

	var down = $('<button class="btn-info btn-xs">Dislike</button>');
	down.click(function() {
		item.increment('goDown');
		item.save();
	});
	down.appendTo(postTitle);

	$('#stars').raty({
		readOnly: true,
		score: totalRatings/numRatings
	})
}

getData()

