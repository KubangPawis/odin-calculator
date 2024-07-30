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
                checkDividedByZeroState();

                if (resetState) {
                    entryField.textContent = "";
                    resetState = false;
                }
                if (recentEquationState) {
                    equationStage.textContent = "";
                    secondNum = null;
                    operator = null;
                }
                if (firstNum && operator) {
                    entryFieldValueChange = true;
                }
                entryField.textContent += buttonValue;
                recentEquationState = false;
            } else if (currentButton.classList.contains("operator-button")) {
                const entryFieldValue = entryField.textContent;
                secondNum = null;
                if (entryFieldValueChange) {
                    calculateResult();
                    secondNum = null;
                    firstNum = result;
                    entryField.textContent = result;
                    entryFieldValueChange = false;
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
                checkDividedByZeroState();
                prepareCalculator();
            } else if (currentButton.id === "clear-entry") {
                checkDividedByZeroState();
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
                checkDividedByZeroState();

                if (recentEquationState) {
                    equationStage.textContent = "";
                    prepareCalculator();
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

                if (dividedByZeroState) {
                    entryField.textContent = "Cannot divide by zero";
                    disableOperatorAndEquals();
                } else entryField.textContent = `${result}`;

                resetState = true;
                recentEquationState = true;

                console.log("First Number: " + firstNum);
                console.log("Second Number: " + secondNum);
                console.log("Result: " + result);
            }

            //SPECIAL CASE: If entryField contains a decimal
            if (entryField.textContent.includes(".")) decimalPresent = true;
            else decimalPresent = false;
            checkDecimalPresent();
        });
    })
}

function setKeyPressEvent() {
    const operandMap = new Map([
        ["1", document.querySelector("#operand-1")],
        ["2", document.querySelector("#operand-2")],
        ["3", document.querySelector("#operand-3")],
        ["4", document.querySelector("#operand-4")],
        ["5", document.querySelector("#operand-5")],
        ["6", document.querySelector("#operand-6")],
        ["7", document.querySelector("#operand-7")],
        ["8", document.querySelector("#operand-8")],
        ["9", document.querySelector("#operand-9")],
        ["0", document.querySelector("#operand-0")],
        [".", document.querySelector("#operand-dot")]
    ]);

    const operatorMap = new Map([
        ["/", document.querySelector("#divide-button")],
        ["x", document.querySelector("#multiply-button")],
        ["*", document.querySelector("#multiply-button")],
        ["-", document.querySelector("#subtract-button")],
        ["+", document.querySelector("#add-button")],
    ]);

    const specialKeyMap = new Map([
        ["Backspace", document.querySelector("#backspace")],
        ["Enter", document.querySelector("#equals-button")]
    ]);

    document.addEventListener("keydown", (e) => {
        const currentKey = e.key;
        e.preventDefault();

        if (operandMap.has(currentKey)) {
            operandMap.get(currentKey).click();
        } else if (operatorMap.has(currentKey)) {
            operatorMap.get(currentKey).click();
        } else if (specialKeyMap.has(currentKey)) {
            specialKeyMap.get(currentKey).click();
        }
    });
}

function prepareCalculator() {
    const entryField = document.querySelector("#entry-field");
    entryField.textContent = 0;
    firstNum = 0;
    secondNum = null;
    operator = null;
    resetState = true;
    recentEquationState = false;
    dividedByZeroState = false;
    entryFieldValueChange = false;
    decimalPresent = false;
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

    if (operator === "÷" && secondNum === 0) {
        result = null;
        dividedByZeroState = true;
    } else {
        result = operate(firstNum, secondNum, operator);
    }
}

function disableOperatorAndEquals() {
    const operatorButtons = document.querySelectorAll(".operator-button");
    const equalsButton = document.querySelector("#equals-button");

    equalsButton.disabled = true;
    operatorButtons.forEach(button => {
        button.disabled = true;
    });
}

function disableDecimal() {
    const decimalButton = document.querySelector("#operand-dot");
    decimalButton.disabled = true;
}

function enableDecimal() {
    const decimalButton = document.querySelector("#operand-dot");
    decimalButton.disabled = false;
}

function enableAllButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = false;
    });
}

function checkDividedByZeroState() {
    if (dividedByZeroState) {
        enableAllButtons();
        dividedByZeroState = false;
    }
}

function checkDecimalPresent() {
    if (decimalPresent) disableDecimal();
    else enableDecimal();
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
let dividedByZeroState = false;
let entryFieldValueChange = false;
let decimalPresent = false;

prepareCalculator();
setButtonEvent();
setKeyPressEvent();