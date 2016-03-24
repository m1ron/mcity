/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/**
 * On document ready
 */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

	/** Scrolling navigation */
	$('.menu').each(function () {
		$('a', this).click(function (e) {
			$('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 'slow');
			e.preventDefault();
		});
	});

	/** Carousels */
	$('.about, .services').each(function () {
		var carousel = $('.list', this),
			settings = {
				slidesToShow: 1,
				slidesToScroll: 1,
				mobileFirst: true,
				adaptiveHeight: true,
				infinite: true,
				dots: true,
				arrows: false,
				customPaging: function (slider, i) {
					return '<span class="dot" data-role="none"></span>';
				},
				responsive: [
					{
						breakpoint: 750,
						settings: 'unslick'
					}
				]
			};
		carousel.slick(settings);
		$(window).on('resize', function () {
			if ($(window).width() >= 750) {
				if (carousel.hasClass('slick-initialized')) {
					carousel.slick('unslick');
				}
			} else {
				if (!carousel.hasClass('slick-initialized')) {
					carousel.slick(settings);
				}
			}
		});
	});
});