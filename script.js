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
    const operationInput = document.querySelector(".operation-input");
    const operationResult = document.querySelector(".operation-result");
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const buttonValue = buttonMapping[e.target.id];

            if (e.target.classList.contains("operand-button")) {
                operationInput.textContent += buttonValue;
                numBuffer += buttonValue;
                console.log("Buffer: " + numBuffer);
            } else if (e.target.classList.contains("operator-button")) {
                firstNum = Number(numBuffer);
                numBuffer = "";
                operationInput.textContent += buttonValue;
                operator = buttonValue;
            } else if (e.target.id === "clear-single") {
                operationInput.textContent = operationInput.textContent.slice(0, -1);
                numBuffer = numBuffer.slice(0, -1);
            } else if (e.target.id === "clear-all") {
                operationInput.textContent = "";
                operationResult.textContent = "";
                numBuffer = "";
                firstNum = null;
                secondNum = null;
                operator = null;
            } else if (e.target.id === "equals-button") {
                secondNum = Number(numBuffer);
                numBuffer = "";
                const result = operate(firstNum, secondNum, operator);
                console.log("First Number: " + firstNum);
                console.log("Second Number: " + secondNum);
                console.log("Result: " + result);
                operationResult.textContent = `= ${result}`;
            }
        });
    })
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
let secondNum;
let operator;


setButtonEvent();