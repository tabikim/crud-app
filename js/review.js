Parse.initialize('QYwbmOOAAnRADjnUmKVJGv6dmoR156f3HRcd982D', 'CxTaXtOluIjRSXNh1amyrzCjC6MFbFDFsz4DoW1F');

var Review = Parse.Object.extend('Review')

var reviewItem = new Review()

$('form').submit(function(){
	reviewItem.set('title', $('#subject').val());
	reviewItem.set('body', $('#review-input').val());
	reviewItem.set('rating', $('#stars').val());

	reviewItem.save(null, {
		success: function(reviewItem) {
		}
	})
});

$('#stars').raty();
