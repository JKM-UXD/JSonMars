var clock = document.getElementById('currentTime');
var today = new Date();
var todaysDay = document.getElementById('day');
var todaysDate = document.getElementById('date');
var sw = document.getElementById('switch');
var visualsDay = document.getElementById('visualsDay');
var visualsNight = document.getElementById('visualsNight');
var sky = document.getElementById('sky');
var nightSky = document.getElementById('nightSky');
var body = document.getElementsByTagName('body')[0];
var changeTime = document.getElementById('changeTime');
var clockBackground = document.getElementById('clockBackground');
var earth = false;
var nightTime = false;







// Changing from mars to earth time on click

changeTime.onclick = function() {
    if(earth) {
        earth = false;
        changeTime.innerHTML = 'Change to Earth Time';
    }
    else {
        earth = true;
        changeTime.innerHTML = 'Change to Mars Time';
    }
}






// displays the clock according to the selected time calculation

function displayClock() {
    displayTimeMoveSunControlDayNight();

    if(earth) {
        displayEarthDay();
        displayEarthDate();
        if(nightTime) {
            clockBackground.style.background = '#78A09C';
        }
        else {
            clockBackground.style.background = '#A2D5D9';
        }
    }
    else {
        displayDay();
        displayDate();
        clockBackground.style.background = 'none';
    }
    // needs to update to recognise button click
    setInterval(displayClock, 1000);
}

displayClock();





function displayTimeMoveSunControlDayNight() {
	
    // Time for Earth and Mars

    var todayTime = new Date;

    if(earth) {
        var sec = todayTime.getUTCSeconds();
        var min = todayTime.getUTCMinutes();
        var h = todayTime.getUTCHours();
    
        if(h < 10) {
            h = '0' + h;
        }
    
        if(min < 10) {
            min = '0' + min;
        }
    
        if(sec < 10) {
            sec = '0' + sec;
        }
    }
    else {
        // Mars time is altered by +40min with prevention from going over the normal 60min/24h

        var sec = todayTime.getUTCSeconds();
        var min = todayTime.getUTCMinutes()+40;
        var h = todayTime.getUTCHours();

        if(min > 59) {
            h = h+1;
            min = min-59;
        }

        if(h > 23) {
            h = 0;
        }

        if(h < 10) {
            h = '0' + h;
        }

        if(min < 10) {
            min = '0' + min;
        }

        if(sec < 10) {
            sec = '0' + sec;
        }
    }

    // retrieving marsTime and displaying it onscreen
    clock.innerHTML = h + ':' + min + ':' + sec;




    // Sun position calculation with percentage of the day
    currentHour = h;
    dayPercent = Math.round((currentHour/24)*100);

    var sun = document.getElementById('sun');
    sun.style.left = dayPercent+'%';


    // changing from night to day

    if(h < 5 || h > 20) {
        visualsDay.style.display = 'none';
        sky.style.display = 'none';
    
        visualsNight.style.display = 'block';
        nightSky.style.display = 'block';
        
        body.style.backgroundColor = '#E78C01';

        nightTime = true;
    }
    else {
        visualsDay.style.display = 'block';
        sky.style.display = 'block';
    
        visualsNight.style.display = 'none';
        nightSky.style.display = 'none'; 

        body.style.backgroundColor = '#FECF87';

        nightTime = false;
    }

    setInterval(displayTimeMoveSunControlDayNight, 1000);
}












// displaying Mars days based on earth day

function displayDay() {
    var day;
    var daysOfTheWeek = ['Solis', 'Lunae', 'Martis', 'Mercurii', 'Jovis', 'Veneris', 'Saturni']

    day = today.getUTCDay();
    todaysDay.innerHTML = daysOfTheWeek[day-1];
}


// displaying Mars months based on earth months (only 12 out of 24)

function displayDate() {
    var months = ['Sagittarius', 'Dhanus', 'Capricornus', 'Makara', 'Aquarius', 'Kumbha', 'Pisces', 'Mina', 'Aries', 'Mesha', 'Taurus', 'Rishabha']

    dt = today.getUTCDate();
    m = today.getUTCMonth();
    y = today.getUTCFullYear()+11;

    todaysDate.innerHTML = dt + '.' + ' ' + months[m] + ' ' + y;
}






function displayEarthDay() {
    var day;
    var daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    day = today.getUTCDay();
    todaysDay.innerHTML = daysOfTheWeek[day-1];
}

function displayEarthDate() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    dt = today.getUTCDate();
    m = today.getUTCMonth();
    y = today.getUTCFullYear()+11;

    todaysDate.innerHTML = dt + '.' + ' ' + months[m] + ' ' + y;
}

