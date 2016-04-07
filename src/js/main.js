/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/**
 * On document ready
 */
$(document).ready(function () {

	$("body>[data-role='panel']").each(function () {
		$(this).panel();
		$("[data-role='listview']", this).listview();
		$(this).trigger("create");
	});

	$('.ui-menu-list').find('.dark').eq(0).addClass('dark-first-child');
});