$(document).ready(function ()
{
	$(".main ul").gridster({
		widget_margins: [10, 10],
		widget_base_dimensions: [100, 100],
		// extra_rows: 12,
		extra_cols: 5,
		resize: {
			enabled: true,
		}
	});

 
	// var modWidth = $('#main-board').width() - ($('#main-board').width() % 100);
	// $('.module-disclaimer').width(modWidth);
	// $('#main-board').width(modWidth);
	// var board = $('#main-board').packery({
	// 	columnWidth: 100,
	// 	rowHeight: 100,
	// 	itemSelector: '.module',
	// 	gutter:4,
	// });

	// board.find('.module').each(function (i, itemElem)
	// {
	// 	var draggie = new Draggabilly(itemElem);
	// 	board.packery('bindDraggabillyEvents', draggie);
	// });

	// //toolbar activate module
	// $('#main-toolbar li').on('click',function()
	// {
	// 	moduleName = $(this).data('linkname');
	// 	console.log(moduleName);
	// 	$('.module[data-linkname='+moduleName+']').show();
	// 	board.packery();
	// });


	// // //////////////////////////////
	// // ////// RIGHT CLICK //////
	// // ////////////////////////////
	
	// // Trigger action when the contexmenu is about to be shown
	// $(".module").bind("contextmenu", function (event) {
		
	// 	// Avoid the real one
	// 	event.preventDefault();
		
	// 	// Show contextmenu
	// 	$(this).find(".module-option").finish().toggle(100).
		
	// 	// In the right position (the mouse)
	// 	css({
	// 		top: event.pageY + "px",
	// 		left: event.pageX + "px"
	// 	});
	// });


	// // If the document is clicked somewhere
	// $(document).bind("mousedown", function (e) {
		
	// 	// If the clicked element is not the menu
	// 	if (!$(e.target).parents(".module-option").length > 0) {
			
	// 		// Hide it
	// 		$(".module-option").hide(100);
	// 	}
	// });

	// $("iframe").bind("mousedown", function (e) {console.log("ok");});


	// // If the menu element is clicked
	// $(".module-option li").click(function(){
		
	// 	// This is the triggered action name
	// 	switch($(this).attr("data-action")) {
			
	// 		// A case for each action. Your actions here
	// 		case "close":
	// 			$(this).parents('.module').hide();
	// 			board.packery();
	// 		break;
	// 		case "fixed": 
	// 			$(this).parents('.module').draggabilly('disable');
	// 			$(this).hide();
	// 			$(this).parent().children('.fa-arrows').show();
	// 		break;
	// 		case "third": alert("third"); break;
	// 	}
	// 	// Hide it AFTER the action was triggered
	// 	$(".module-option").hide(100);
	//  });
});
