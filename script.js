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
            const currentButton = e.target;

            if (currentButton.classList.contains("operand-button")) {
                console.log("First Number: " + firstNum);
                console.log("Operator: " + operator);
                if (resetState) {
                    entryField.textContent = "";
                    resetState = false;
                }
                if (recentEquationState) {
                    equationStage.textContent = "";
                    secondNum = null;
                    operator = null;
                }
                entryField.textContent += buttonValue;
                recentEquationState = false;
            } else if (currentButton.classList.contains("operator-button")) {
                const entryFieldValue = entryField.textContent;
                secondNum = null;
                if (firstNum && operator) {
                    calculateResult();
                    secondNum = null;
                    firstNum = result;
                } else if (recentEquationState) {
                    firstNum = result;
                } else {
                    firstNum = Number(entryFieldValue);
                }

                operator = buttonValue;
                stageEquation();
                resetState = true;
                recentEquationState = false;
            } else if (currentButton.id === "clear-all") {
                equationStage.textContent = "";
                prepareCalculator();
            } else if (currentButton.id === "clear-entry") {
                if (recentEquationState && secondNum !== null) {
                    equationStage.textContent = "";
                    prepareCalculator();
                } else {
                    entryField.textContent = "0";
                }
                resetState = true;
                recentEquationState = false;
            } else if (currentButton.id === "backspace") {
                const entryFieldValue = entryField.textContent;
                if (recentEquationState) {
                    equationStage.textContent = "";
                } else if (entryFieldValue.length < 2) {
                    entryField.textContent = "0";
                    resetState = true;
                } else {
                    entryField.textContent = entryField.textContent.slice(0, -1);
                }
                recentEquationState = false;
            } else if (currentButton.id === "equals-button") {
                calculateResult();
                stageEquation();
                entryField.textContent = `${result}`;
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
    firstNum = 0;
    secondNum = null;
    operator = null;
    resetState = true;
    recentEquationState = false;
}

function stageEquation() {
    const equationStage = document.querySelector("#equation-stage");
    let equationToStage;
    if (!operator && secondNum === null) {
        equationToStage = `${firstNum} =`;
    } else if (secondNum === null) {
        equationToStage = `${firstNum} ${operator}`;
    } else {
        equationToStage = `${firstNum} ${operator} ${secondNum} =`;
    }
    equationStage.textContent = equationToStage;
}

function calculateResult() {
    const entryField = document.querySelector("#entry-field");
    const entryFieldValue = entryField.textContent;
    if (recentEquationState || !operator) {
        firstNum = Number(entryFieldValue);
    } else {
        secondNum = Number(entryFieldValue);
    }
    result = operate(firstNum, secondNum, operator);
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
    "operand-9": 9,
    "operand-0": 0,
    "operand-dot": "."
}

let firstNum = 0;
let secondNum = null;
let operator = null;
let result;
let resetState = true;
let recentEquationState = false;

prepareCalculator();
setButtonEvent();