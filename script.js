// ============ Form Input ==============
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// ============ Countdown ==============
const countdownContainer = document.getElementById('countdown');
const countdownContainerTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown number / Complete UI
function updateDOM(){
    countdownActive = setInterval(()=>{

        const now = new Date().getTime();
        const distance = countdownValue - now - 8 * hour;
        
        // calculate day, hour, minute, second from distance
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Populating Countdown
        countdownContainerTitle.innerText = countdownTitle;
        timeElements[0].innerText = days;
        timeElements[1].innerText = hours;
        timeElements[2].innerText = minutes;
        timeElements[3].innerText = seconds;
        

        //hide Input window
        inputContainer.hidden = true;
        countdownContainer.hidden = false;
    },second);
}


// Take Values from Form 
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = document.getElementById('title').value;
    countdownDate = document.getElementById('date-picker').value;
    
    // Get Number Version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}

// Reset All Values 
function reset(){
    // Hide Countdown, Show Input
    countdownContainer.hidden = true;
    inputContainer.hidden = false;

    // Stop the Countdown
    clearInterval(countdownActive);

    // Reset Countdown info
    countdownTitle = '';
    countdownDate = '';
}


// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);