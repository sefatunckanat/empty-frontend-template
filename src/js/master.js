$(function(){
    $('img').on('dragstart', function(event) { event.preventDefault(); });
    $('select').selectize();
});