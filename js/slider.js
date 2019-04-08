var slideCount = $('#slider ul li').length;
var slideWidth = $('#slider ul li').width();
var slideHeight = $('#slider ul li').height();
var sliderUlWidth = slideCount * slideWidth;

var Slider = {
  
		moveLeft: function() {
        $('#slider ul').animate({
            left: +slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    },

        moveRight: function() {
        $('#slider ul').animate({
            left: -slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    },
        moveRGkey: function(event) {
        e = event || window.event;

        if (e.keyCode == '37') {
            Slider.moveLeft();
        } else if (e.keyCode == '39') {
            Slider.moveRight();
        }
    }
}


jQuery(document).ready(function ($) {

  $('#checkbox').change(function(){
    setInterval(function () {
        moveRight();
    }, 3000);
  });
  
	
	
	$('#slider').css({ width: slideWidth, height: slideHeight });
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider ul li:last-child').prependTo('#slider ul');

    

    $('a.control_prev').click(function () {
        Slider.moveLeft();
    });

    $('a.control_next').click(function () {
        Slider.moveRight();
    });

    $('body').on('keydown', function () {
        Slider.moveRGkey();
    });
    

});    
