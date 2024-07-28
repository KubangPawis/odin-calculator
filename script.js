function add(firstNum, secondNum) {
    return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
    return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
    return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
    return firstNum / secondNum;
}

function operate(firstNum, secondNum, operator) {
    if (secondNum === null || operator === null) return firstNum;

    let result;
    switch (operator) {
        case "+":
            result = add(firstNum, secondNum);
            break;
        case "-":
            result = subtract(firstNum, secondNum);
            break;
        case "×":
            result = multiply(firstNum, secondNum);
            break;
        case "÷":
            result = divide(firstNum, secondNum);
            break;
    }
    return result;
}

function setButtonEvent() {
    const equationStage = document.querySelector("#equation-stage");
    const entryField = document.querySelector("#entry-field");
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const buttonValue = buttonMapping[e.target.id];

            if (e.target.classList.contains("operand-button")) {
                if (resetState) {
                    entryField.textContent = "";
                    resetState = false;
                }
                entryField.textContent += buttonValue;
                numBuffer += buttonValue;
                console.log("Buffer: " + numBuffer);
                recentEquationState = false;
            } else if (e.target.classList.contains("operator-button")) {
                if (recentEquationState) firstNum = result;
                else firstNum = Number(numBuffer);

                numBuffer = "";
                entryField.textContent += buttonValue;
                operator = buttonValue;
                recentEquationState = false;
            } else if (e.target.id === "clear-single") {
                entryField.textContent = entryField.textContent.slice(0, -1);
                numBuffer = numBuffer.slice(0, -1);
                recentEquationState = false;
            } else if (e.target.id === "clear-all") {
                entryField.textContent = "";
                equationStage.textContent = "";
                prepareCalculator();
            } else if (e.target.id === "equals-button") {
                if (firstNum) {
                    secondNum = Number(numBuffer);
                } else {
                    firstNum = Number(numBuffer);
                }
                result = operate(firstNum, secondNum, operator);
                equationStage.textContent = `${firstNum} ${operator} ${secondNum}`;
                entryField.textContent = `${result}`;
                numBuffer = "";
                resetState = true;
                recentEquationState = true;

                console.log("First Number: " + firstNum);
                console.log("Second Number: " + secondNum);
                console.log("Result: " + result);
            }
        });
    })
}

function prepareCalculator() {
    const entryField = document.querySelector("#entry-field");
    entryField.textContent = 0;
    numBuffer = "";
    firstNum = 0;
    secondNum = null;
    operator = null;
    resetState = true;
    recentEquationState = false;
}

const buttonMapping = {
    "divide-button": "÷",
    "multiply-button": "×",
    "subtract-button": "-",
    "add-button": "+",
    "operand-1": 1,
    "operand-2": 2,
    "operand-3": 3,
    "operand-4": 4,
    "operand-5": 5,
    "operand-6": 6,
    "operand-7": 7,
    "operand-8": 8,
    "operand-9": 9
}

let firstNum = 0;
let numBuffer = "";
let secondNum = null;
let operator = null;
let result;
let resetState = true;
let recentEquationState = false;

prepareCalculator();
setButtonEvent();