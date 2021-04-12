// ============ Form Input ==============
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

let countdownTitle = '';
let countdownDate = '';

// Set Date Input min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Take Values from Form 
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = document.getElementById('title').value;
    countdownDate = document.getElementById('date-picker').value;
}


// Event Listener
countdownForm.addEventListener('submit', updateCountdown);



