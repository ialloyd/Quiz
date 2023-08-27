let nextQ = document.querySelector('#next');
let holder = document.querySelector('.container')
let arr;
let flag = false;
let i = 0;
let container = document.createElement('div');
let counter = 0;
let counterflag = false;

async function getData() {

    let response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
    let result = await response.json();
    arr = result.results;
    showDataOnUI();

}

let incrementScore = () => {

    if (counterflag) {

        ++counter;

    }
}

let selectOption = (event) => {

    const buttons = document.querySelectorAll('button');
    let buttonsToReset = Array.from(buttons).slice(0, -1);
    event.target.style.backgroundColor = 'lightblue';

    if (event.target.textContent === correctAnswer) {

        counterflag = true;


    }
    else {

        counterflag = false;

    }

    const resetButtonBackgrounds = () => {

        buttonsToReset.forEach(button => {

            if (event.target.textContent !== button.textContent) {
                button.style.backgroundColor = '';
            }
        });
    };

    resetButtonBackgrounds();

}

let processData = () => {
    correctAnswer = arr[i].correct_answer
    let heading = document.createElement('h3');
    heading.textContent = i + 1 + ' . ' + arr[i].question;
    let option1 = document.createElement('button')
    option1.addEventListener('click', selectOption);
    option1.textContent = arr[i].incorrect_answers[0]
    let option2 = document.createElement('button')
    option2.addEventListener('click', selectOption);
    option2.textContent = arr[i].incorrect_answers[1]
    let option3 = document.createElement('button')
    option3.addEventListener('click', selectOption);
    option3.textContent = arr[i].incorrect_answers[2]
    let option4 = document.createElement('button')
    option4.addEventListener('click', selectOption);
    option4.textContent = arr[i].correct_answer
    container.append(heading, option1, option2, option3, option4);
    holder.insertBefore(container, holder.lastElementChild);
    i++;

}

let showDataOnUI = () => {

    container.classList.add('question');
    container.innerHTML = '';

    if (i < arr.length) {
        if (!flag) {

            flag = true;
            processData();

        }
        else {
            let container = document.querySelector('.question');
            container.innerHTML = '';
            if (i < arr.length) {

                processData();

            }
        }
    }
    else {

        incrementScore();
        finalScore();

    }
}

let finalScore = () => {

    container.innerHTML = '';
    let finalResult = document.createElement('h2');
    finalResult.innerHTML = `Your score is ${counter}/10!`;
    holder.insertBefore(container, holder.lastElementChild);
    counterflag = false;
    clearInterval(timer)
    nextQ.remove();
    let start = document.createElement('button');
    start.textContent = 'Start New Quiz';
    start.addEventListener('click', () => {
        location.reload();
    });
    container.append(finalResult, start);


}

getData();


const duration = 60;

const timerDisplay = document.querySelector('#timer');

const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

let timeRemaining = duration;
timerDisplay.textContent = formatTime(timeRemaining);


timer = setInterval(() => {

    timeRemaining--;

    if (timeRemaining === 0) {
        clearInterval(timer);

        endQuiz();
    }

    timerDisplay.textContent = formatTime(timeRemaining);


}, 1000);


let endQuiz = () => finalScore();


nextQ.addEventListener('click', showDataOnUI);
nextQ.addEventListener('click', incrementScore);