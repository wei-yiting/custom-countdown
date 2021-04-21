// ============ Form Input ==============
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// ============ Countdown ==============
const countdownContainer = document.getElementById('countdown');
const countdownContainerTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// ============ Complete ==============
const completeContainer = document.getElementById('complete');
const completeContainerInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

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

        // hide Input window
        inputContainer.hidden = true;

        // If countdown ended, show complete
        if (distance < 0){
            countdownContainer.hidden = true;
            clearInterval(countdownActive);
            completeContainerInfo.innerText = `${countdownTitle} Finished on ${countdownDate}`;
            completeContainer.hidden = false;
        }else{
            // show countdown in progress, populating countdown
            countdownContainerTitle.innerText = countdownTitle;
            timeElements[0].innerText = days;
            timeElements[1].innerText = hours;
            timeElements[2].innerText = minutes;
            timeElements[3].innerText = seconds;

            completeContainer.hidden =  true;
            countdownContainer.hidden = false;      
        }
    },second);
}


// Take Values from Form 
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = document.getElementById('title').value;
    countdownDate = document.getElementById('date-picker').value;
    
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // Check form is not empty
    if (countdownTitle ==='' || countdownDate ===''){
        alert("Please fill in both of the fields: \nTitle & Date")
    }else{
        //Get Number Version of current Date, update DOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values 
function reset(){
    // Hide Countdown, Show Input
    countdownContainer.hidden = true;
    completeContainer.hidden =true;
    inputContainer.hidden = false;

    // Stop the Countdown
    clearInterval(countdownActive);

    // Reset Countdown info
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

// access previous title and date, restore it 
function restorePreviousCountdown(){
    // Get countdown from localStorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
};


// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check localStorage
restorePreviousCountdown();