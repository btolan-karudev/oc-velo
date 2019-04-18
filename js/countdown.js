var countDown;
var timeInterval;

var clock = document.querySelector('#clock');
var minutesSpan = clock.querySelector('.minutes');
var secondsSpan = clock.querySelector('.seconds');


function startClock(endTime) {

    clearInterval(timeInterval);
    timeInterval = setInterval(function () {

        var t = timeRemaining(endTime);

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);


        if (t.total <= 1000) {

            clearInterval(timeInterval);
            sessionStorage.clear();
            setTimeout(function () {
                $('#timing').hide();
            }, 1000);
        }

    }, 1000);



}


function timeRemaining(endDate) {
    var t = endDate - new Date().getTime();

    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };

}

// function cancelReservation() {
//     $('#cancelReservation').click(function () {
//         $('#infoReservation').addClass('d-none');
//         sessionStorage.clear();
//         clearInterval(timeInterval);
//         timeRemaining(0);
//
//         // $('#timing').hide();
//     });
// }

