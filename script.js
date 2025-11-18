const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator-display');
const buttons = calculator.querySelector('.calculator-buttons');

let firstValue = '';
let operator = '';
let secondValue = '';
let result = '';
let waitingForSecondValue = false;

buttons.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.value;

    if (!action) {
        if (displayedNum === '0' || waitingForSecondValue) {
            display.value = keyContent;
            waitingForSecondValue = false;
        } else {
            display.value = displayedNum + keyContent;
        }
        if (operator && firstValue) {
            secondValue = display.value;
        }
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' || action === 'percentage') {
        if (firstValue && operator && secondValue) {
            result = calculate(firstValue, operator, secondValue);
            display.value = result;
            firstValue = result;
            secondValue = '';
        } else {
            firstValue = displayedNum;
        }
        operator = action;
        waitingForSecondValue = true;
    }

    if (action === 'clear') {
        firstValue = '';
        operator = '';
        secondValue = '';
        result = '';
        display.value = '0';
        waitingForSecondValue = false;
    }

    if (action === 'backspace') {
        if (display.value.length === 1) {
            display.value = '0';
        } else {
            display.value = display.value.slice(0, -1);
        }
        if (operator && firstValue) {
            secondValue = display.value;
        } else {
            firstValue = display.value;
        }
    }

    if (keyContent === '.') {
        if (!displayedNum.includes('.')) {
            display.value = displayedNum + '.';
        }
        if (waitingForSecondValue) {
            display.value = '0.';
            waitingForSecondValue = false;
        }
        if (operator && firstValue) {
            secondValue = display.value;
        }
    }

    if (action === 'calculate') {
        if (firstValue && operator) {
            if (!secondValue) {
                secondValue = displayedNum;
            }
            display.value = calculate(firstValue, operator, secondValue);
            firstValue = display.value;
            operator = '';
            secondValue = '';
            waitingForSecondValue = true;
        }
    }
});

function calculate(n1, operator, n2) {
    let num1 = parseFloat(n1);
    let num2 = parseFloat(n2);
    if (operator === 'add') {
        return (num1 + num2).toString();
    }
    if (operator === 'subtract') {
        return (num1 - num2).toString();
    }
    if (operator === 'multiply') {
        return (num1 * num2).toString();
    }
    if (operator === 'divide') {
        return (num1 / num2).toString();
    }
    if (operator === 'percentage') {
        return (num1 * (num2 / 100)).toString();
    }
}