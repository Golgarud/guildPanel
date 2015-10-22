$(document).ready(function () {
	var modWidth = $('#main-board').width() - ($('#main-board').width() % 100);
	$('.module-disclaimer').width(modWidth);
	$('#main-board').width(modWidth);
	var board = $('#main-board').packery({
		columnWidth: 100,
		rowHeight: 100,
		itemSelector: '.module',
		gutter:10,
	});

	board.find('.module').each(function (i, itemElem) {
		var draggie = new Draggabilly(itemElem);
		board.packery('bindDraggabillyEvents', draggie);
	});

	$('.module-option .fa-close').on('click',function(){
		$(this).parents('.module').remove();
	});
	$('.module-option .fa-thumb-tack').on('click',function(){
		console.log('fixé');
		$(this).parents('.module').draggabilly('disable');
		$(this).hide();
		$(this).parent().children('.fa-arrows').show();
	});
	$('.module-option .fa-arrows').on('click',function(){
		console.log('draggable');
		$(this).parents('.module').draggabilly('enable');
		$(this).hide();
		$(this).parent().children('.fa-thumb-tack').show();
	});
});
