$(function() {
	$('.menu-button').on('click', function(event) {
		$('.menu').addClass('active');
		$('.menu').animate({top: 0});
	});

	$('.menu button').on('click', function(event) {
		$('.menu').animate({top: '-100px'}, 400, function() {$('.menu').removeClass('active')});
	});
});

$(window).load(function() {
	$('#list-container').isotope({
	  // options
	  itemSelector : '.item',
	  layoutMode : 'masonry',
	  animationEngine : 'jquery'
	});
});