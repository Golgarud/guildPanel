$(document).ready(function () {
	var modWidth = $('#main-board').width() - ($('#main-board').width() % 100);
	$('.module-disclaimer').width(modWidth);
	$('#main-board').width(modWidth);
	var $board = $('#main-board').packery({
		columnWidth: 100,
		rowHeight: 100,
		itemSelector: '.module'
	});

	$board.find('.module').each(function (i, itemElem) {
		var draggie = new Draggabilly(itemElem);
		$board.packery('bindDraggabillyEvents', draggie);
	});
});
