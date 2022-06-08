import { updateHistory } from "./Historymemory.js";

const displayResult = document.querySelector(".calculator-screen");
export const outPutOperate = document.querySelector(".data-calculation");
const numberData = document.querySelectorAll(".data-number");
const btnKeys = document.querySelector(".calculator-keys");

export const calculator = {
  displayValue: "0",
  firstNumber: null,
  secondNumber: null,
  waitingForSecondOperand: false,
  equal: false,
  operator: null,
  result: null,
  percentResult: null,
};

const inputDigit = (number) => {
  if (calculator.result !== null) {
    clearAll();
  }
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0";
    calculator.secondNumber === null
      ? (calculator.secondNumber = number)
      : (calculator.secondNumber += number);

    calculator.displayValue = calculator.secondNumber;
  } else if (calculator.firstNumber === null) {
    calculator.firstNumber = number;
    calculator.displayValue = calculator.firstNumber;
  } else {
    calculator.firstNumber += number;
    calculator.displayValue = calculator.firstNumber;
  }
};

const deleteLastCharacter = () => {
  // debugger;
  displayResult.innerHTML = displayResult.innerHTML.substring(
    0,
    displayResult.innerHTML.length - 1
  );
  // if (calculator.result !== null) {
  // } else
  if (calculator.secondNumber !== null) {
    calculator.secondNumber = displayResult.innerHTML;
  } else {
    calculator.firstNumber = displayResult.innerHTML;
  }

  calculator.displayValue = displayResult.innerHTML;

  updateDisplay();
};

function inputDecimal() {
  if (!calculator.displayValue.includes(".")) {
    if (calculator.firstNumber === null) {
      calculator.firstNumber = "0.";
      calculator.displayValue = calculator.firstNumber;
    } else if (
      calculator.secondNumber === null &&
      calculator.waitingForSecondOperand === true
    ) {
      calculator.secondNumber = "0.";
      calculator.displayValue = calculator.secondNumber;
    } else {
      if (
        calculator.secondNumber === null &&
        calculator.waitingForSecondOperand === false
      ) {
        calculator.firstNumber += ".";
        calculator.displayValue = calculator.firstNumber;
      } else {
        calculator.secondNumber += ".";
        calculator.displayValue = calculator.secondNumber;
      }
    }
  }

  updateDisplay();
}

const positiveNegative = () => {
  debugger;
  calculator.displayValue = String(calculator.displayValue);
  if (calculator.displayValue.includes("-")) {
    // let digit = String(displayResult.innerHTML);
    calculator.displayValue = calculator.displayValue.replace("-", "");
    calculator.firstNumber;
  } else {
    calculator.displayValue = "-" + calculator.displayValue;
  }
  if (
    calculator.secondNumber !== null &&
    calculator.waitingForSecondOperand === true
  ) {
    calculator.secondNumber = parseFloat(calculator.displayValue);
  }
  updateDisplay();
};

function percentNumber() {
  if (calculator.percentResult !== null) {
    calculator.firstNumber = calculator.result;
  }
  calculator.percentResult =
    (calculator.firstNumber * calculator.secondNumber) / 100;
  calculator.secondNumber = calculator.percentResult;
  calculator.displayValue = calculator.secondNumber;
  console.log(calculator.percentResult);
  updateDisplay();
}

const operatorVal = (operatorValue) => {
  calculator.secondNumber = null;

  if (operatorValue === "numberPow2") {
    calculator.result = parseFloat(Math.pow(calculator.displayValue, 2));
    outPutOperate.innerHTML = `sqr(${calculator.displayValue}) `;
  } else if (operatorValue === "numberPow3") {
    calculator.result = parseFloat(Math.pow(calculator.displayValue, 3));
    outPutOperate.innerHTML = `sqr(${calculator.displayValue}) `;
  } else if (operatorValue === "sqrt") {
    calculator.result = parseFloat(Math.sqrt(calculator.displayValue));
    outPutOperate.innerHTML = `√(${calculator.displayValue})`;
  } else if (operatorValue === "1/x") {
    calculator.result = parseFloat(1 / calculator.displayValue);
    outPutOperate.innerHTML = `1/(${calculator.displayValue})`;
  } else {
    calculator.operator = operatorValue;
    if (calculator.result !== null) {
      calculator.result = calculator.displayValue;
      calculator.firstNumber = calculator.result;
      calculator.result = null;
    } else {
      calculator.firstNumber = calculator.displayValue;
    }
    outPutOperate.innerHTML = ` ${calculator.firstNumber} ${calculator.operator} `;
  }
  calculator.waitingForSecondOperand = true;
  if (calculator.result !== null) {
    calculator.displayValue = calculator.result;
  }
  updateDisplay();
};

const resultOperator = () => {
  if (calculator.result !== null) {
    debugger;

    calculator.firstNumber = String(calculator.result);

    if (calculator.operator === "+") {
      calculator.result =
        parseFloat(calculator.firstNumber) +
        parseFloat(calculator.secondNumber);
    } else if (calculator.operator === "-") {
      calculator.result =
        parseFloat(calculator.firstNumber) -
        parseFloat(calculator.secondNumber);
    } else if (calculator.operator === "×") {
      calculator.result =
        parseFloat(calculator.firstNumber) *
        parseFloat(calculator.secondNumber);
    } else if (calculator.operator === "÷") {
      calculator.result =
        parseFloat(calculator.firstNumber) /
        parseFloat(calculator.secondNumber);
    }
  } else {
    if (calculator.secondNumber === null) {
      outPutOperate.innerHTML += "=";
    } else {
      outPutOperate.innerHTML += `${calculator.secondNumber} =`;
    }

    if (calculator.operator === "+") {
      calculator.result =
        parseFloat(calculator.firstNumber) +
        parseFloat(calculator.secondNumber);
    } else if (calculator.operator === "-") {
      calculator.result =
        parseFloat(calculator.firstNumber) -
        parseFloat(calculator.secondNumber);
    } else if (calculator.operator === "×") {
      calculator.result =
        parseFloat(calculator.firstNumber) *
        parseFloat(calculator.secondNumber);
    } else if (calculator.operator === "÷") {
      calculator.result =
        parseFloat(calculator.firstNumber) /
        parseFloat(calculator.secondNumber);
    }
    // calculator.secondNumber = null;
  }

  calculator.displayValue = calculator.result;
  outPutOperate.innerHTML = `${calculator.firstNumber} ${calculator.operator}  ${calculator.secondNumber} =`;

  updateHistory();
  updateDisplay();
};

function clearAll() {
  calculator.displayValue = "0";
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.waitingForSecondOperand = false;
  calculator.equal = false;
  calculator.operator = null;
  calculator.result = null;
  outPutOperate.innerHTML = "";
  updateDisplay();
}

export function updateDisplay() {
  displayResult.innerHTML = "0";
  displayResult.innerHTML = calculator.displayValue;
}
updateDisplay();

btnKeys.addEventListener("click", (e) => {
  if (e.target.classList.contains("data-number")) {
    inputDigit(e.target.value);
    updateDisplay();
  }

  if (e.target.classList.contains("decimal")) {
    console.log(e.target.value);
    inputDecimal();
  }

  if (e.target.classList.contains("operator")) {
    console.log(e.target.value);
    operatorVal(e.target.value);
    updateDisplay();
  }

  if (e.target.classList.contains("result")) {
    console.log(e.target.value);
    resultOperator();
  }

  if (e.target.classList.contains("positive-negative")) {
    console.log(e.target.value);
    positiveNegative();
  }

  if (e.target.classList.contains("clear-result")) {
    console.log(e.target.value);
    clearAll();
  }

  if (e.target.classList.contains("clear-all")) {
    console.log(e.target.value);
    clearAll();
  }

  if (e.target.classList.contains("delete-number")) {
    console.log(e.target.value);
    deleteLastCharacter();
  }

  if (e.target.classList.contains("percent")) {
    console.log(e.target.value);
    percentNumber();
  }
});
