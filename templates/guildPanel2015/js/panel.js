$( document ).ready(function()
{
	var $board = $('#main-board').packery({
		columnWidth: 80,
		rowHeight: 80
	});

	$board.find('.module').each( function( i, itemElem )
	{
		var draggie = new Draggabilly( itemElem );
		$board.packery( 'bindDraggabillyEvents', draggie );
	});
});
