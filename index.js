//created by Milad Ebrahimi , github : /miladebrahimi96


//getting necessory elements from DOM

const inputEl = document.querySelector('.input');
const historyEl = document.querySelector('.history');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');
const equalEl = document.querySelector('.equal');


//declaring some variables
let input = "";
let history = "";
let dot = false;
let math = '';
let lastOp = '';



operators.forEach(operator => {
    operator.addEventListener('click', e=> {
        //checks if input is empty and returns
        if(!input) return;
        //makes dot false so we can use a dot
        dot = false;
        const operation = e.target.value;
        //checks if we have both input and history and does calculaton, other wise puts input to math
        if(history && input) {
            doMath();
        }
        else{
            math = parseFloat(input);
        }
        clear(operation);
        lastOp = operation;
        console.log(math);

        //clear button functionality
        if(operator.value === 'clear' ){
            input = '';
            inputEl.innerText = '';
        }
    })
})

//AC button functionality(clears all the data)
operators.forEach(operator => {
    if(operator.value === 'clear-all'){
        operator.addEventListener('click', e => {
            history = '';
            historyEl.innerText = '';
            input = '';
            inputEl.innerText = '';
            math = '';
        })
    }
})




numbers.forEach(number => {
    number.addEventListener('click', e => {
        //checks if we have a dot(if we have, no other dot is permited) or not
        if(e.target.innerText === "." && !dot){
            dot = true;
        }else if(e.target.innerText === "." && dot){
            return;
        }
        input += e.target.innerText;
        inputEl.innerText = input;
    })
})

function clear (value = '') {
    //checks which operator is used, then after using operator puts input value to hitory and clears input
    if(value === "plus"){
        history += input + ' ' + '+' + ' ';
    }
    if(value === "multiply"){
        history += input + ' ' + '*' + ' ';
    }
    if(value === "minus"){
        history += input + ' ' + '-' + ' ';
    }
    if(value === "divide"){
        history += input + ' ' + '/' + ' ';
    }
    if(value === "percent"){
        history += input + ' ' + '%' + ' ';
    }
    if(value === 'equal'){
        history += input;
    }
    historyEl.innerText = history;
    inputEl.innerText = '';
    input = '';
}

function doMath() {
    //this is easy, calculation function(we are doing parseFloat() because inputs are strings)
    if(lastOp === 'multiply') {
        math = parseFloat(math) * parseFloat(input);
    }else if(lastOp === 'minus'){
        math = parseFloat(math) - parseFloat(input);
    }
    else if(lastOp === 'plus'){
        math = parseFloat(math) + parseFloat(input);
    }
    else if(lastOp === 'divide'){
        math = parseFloat(math) / parseFloat(input);
    }
    else if(lastOp === 'percent'){
        math = parseFloat(math) % parseFloat(input);
    }
}

equalEl.addEventListener('click', e => {
    //checks if we dont have either of input and history, so we cant use equal, otherwise we can use equal
    if(!history && !input) {
        return;
    }else{
        dot = false;
        doMath();
        clear();
        inputEl.innerText = math;
        input = math;
        history = '';
        lastOp ='';
    }
})


//an event listener for using keyboard instead of mouse
window.addEventListener('keydown', e => {
    console.log(e.key);
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ){
        typeNum(e.key);
    }
    else if (
        e.key === '*' ||
        e.key === '/' ||
        e.key === '%' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === 'Enter'
    ) {
        typeOp(e.key);
    }else if (
        e.key === 'Backspace' ||
        e.key === 'Delete' 
    ){
        typeClear(e.key);
    }
})

function typeNum (key) {
    for(number of numbers){
        if(number.innerText === key){
            number.click();
        }
    }
}

function typeOp (key) {
    for(operator of operators){
        if(operator.getAttribute('data-id') === key){
            operator.click()
        }
    }  
}
function typeClear(key) {
    for(operator of operators){
        if(operator.getAttribute('data-id') === key){
            operator.click()
        }
    }
}



















