const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateElement = document.getElementById('date-picker');
const countdownElement = document.getElementById('countdown');
const countdownElementTitle = document.getElementById('countdown-title');
const countdownElementButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');


let countdownTitle ='';
let countdownDate = '';
let countdownValue = 0;
let countdownActive;

const secondRate = 1000;
const minuteRate = secondRate * 60;
const hourRate = minuteRate * 60;
const dayRate = hourRate * 24;

const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min',today);

function updateDOM(){
    countdownActive = setInterval(() =>{
        const now = new Date().getTime();
        const delta = countdownValue - now;

        const days = Math.floor(delta/dayRate);
        const hours = Math.floor((delta % dayRate)/hourRate);
        const minutes = Math.floor((delta % hourRate)/minuteRate);
        const seconds = Math.floor((delta % minuteRate)/secondRate);

        inputContainer.hidden = true;

        if(delta < 0){
            countdownElement.hidden = true;
            clearInterval(countdownActive);
            completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeElement.hidden = false;
        } else{
            countdownElementTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeElement.hidden = true;
            countdownElement.hidden = false;
        }
        
    },secondRate);


    
}


function updateCountdown(event){


    event.preventDefault();
    countdownTitle= event.srcElement[0].value;
    countdownDate= event.srcElement[1].value;

    if(countdownDate === '' || countdownTitle === ''){
        alert('Enter title and date of the countdown!');
    } else{
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
    
    

}

function reset(){
    completeElement.hidden = true;
    countdownElement.hidden = true;
    inputContainer.hidden = false;
    
    clearInterval(countdownActive);

    countdownTitle = '';
    countdownDate = '';
}

countdownForm.addEventListener('submit', updateCountdown);
countdownElementButton.addEventListener('click',reset)
completeButton.addEventListener('click',reset)