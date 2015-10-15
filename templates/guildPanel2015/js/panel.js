$( document ).ready(function() {
    var $panel = $('#panel').packery({
  columnWidth: 80,
  rowHeight: 80
});

$container.find('.module').each( function( i, itemElem ) {
  // make element draggable with Draggabilly
  var draggie = new Draggabilly( itemElem );
  // bind Draggabilly events to Packery
  $container.packery( 'bindDraggabillyEvents', draggie );
});
});
