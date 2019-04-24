var slideCount = $('#slider ul li').length;
var slideWidth = $('#slider ul li').width();
var slideHeight = $('#slider ul li').height();
var sliderUlWidth = slideCount * slideWidth;

//slider object
var Slider = {

    // deplacement a gauche
    moveLeft: function () {
        $('#slider ul').animate({
            left: +slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    },

    //deplacement a droite
    moveRight: function () {
        $('#slider ul').animate({
            left: -slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    },

    //deplacement avec le clavier
    moveRGkey: function (event) {
        e = event || window.event;

        if (e.keyCode == '37') {
            Slider.moveLeft();
        } else if (e.keyCode == '39') {
            Slider.moveRight();
        }
    }
};
