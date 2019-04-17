var countDown;
var timeInterval;

var clock = document.querySelector('#clock');
var minutesSpan = clock.querySelector('.minutes');
var secondsSpan = clock.querySelector('.seconds');


function startClock(endTime) {
    timeInterval = setInterval(function () {

        var t = timeRemaining(endTime);

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        console.log(t);
        if (t.minutes == 0 && (t.seconds == 0 || t.seconds == 1)) {
            console.log(t.total);
            clearInterval(timeInterval);
            sessionStorage.clear();
            setTimeout(function () {
                $('#timing').hide();
            }, 2000);
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
