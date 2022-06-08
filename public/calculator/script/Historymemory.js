import { outPutOperate, calculator, updateDisplay } from "./app.js";

const btnMemory = document.querySelector(".row3");
const mc = document.querySelector(".mc");
const mr = document.querySelector(".mr");
const historyMemory = document.querySelector(".sidebar");
const historyView = document.querySelector(".history-calculation");
const memoryView = document.querySelector(".memory-calculation");
const clearAllListMemory = document.querySelector(".trash-bin");
const historyText = document.querySelector(".item1");
const memoryText = document.querySelector(".item2");
let memoryList = [];
let historyList = [];

function updateMemory() {
  memoryView.innerHTML = "";
  if (memoryList.length === 0) {
    memoryView.innerHTML = "there nothing save in memory";
  } else {
    memoryList.forEach((number) => {
      const li = document.createElement("li");
      li.innerHTML = number;
      memoryView.prepend(li);
      console.log("rez");
    });
  }
}

function clearHistoryMemory() {
  if (historyView.style.display === "block" && historyList.length !== 0) {
    historyList = [];
    updateHistoryView();
  } else {
    mc.classList.add("disable-mc-mr");
    mr.classList.add("disable-mc-mr");
    memoryList = [];
    updateMemory();
  }
  clearAllListMemory.style.display = "none";
}

export function updateHistory() {
  const objHistory = {
    // idHistory: id++,
    resultHistory: calculator.result,
    operationHistory: outPutOperate.innerHTML,
  };
  historyList.push(objHistory);

  updateHistoryView();
}

function updateHistoryView() {
  historyView.innerHTML = "";
  if (historyList.length === 0) {
    historyView.innerHTML = "there's no history yet";
  } else {
    historyList.forEach((list) => {
      console.log(list);
      const li = document.createElement("li");
      li.innerHTML = `${list.operationHistory} <br> ${list.resultHistory}`;
      historyView.prepend(li);
    });
  }
}

btnMemory.addEventListener("click", (e) => {
  if (e.target.classList.contains("ms")) {
    mc.classList.remove("disable-mc-mr");
    mr.classList.remove("disable-mc-mr");
    clearAllListMemory.style.display = "block";
    memoryList.push(calculator.displayValue);
    updateMemory();
  }

  if (e.target.classList.contains("m-")) {
    mc.classList.remove("disable-mc-mr");
    mr.classList.remove("disable-mc-mr");
    clearAllListMemory.style.display = "block";
    if (memoryList.length === 0) {
      memoryList.push(-calculator.displayValue);
    } else {
      let lastNumber = memoryList.pop(memoryList[memoryList.length - 1]);
      lastNumber = lastNumber - calculator.displayValue;
      memoryList.push(lastNumber);
    }

    updateMemory();
  }

  if (e.target.classList.contains("m+")) {
    mc.classList.remove("disable-mc-mr");
    mr.classList.remove("disable-mc-mr");
    clearAllListMemory.style.display = "block";
    if (memoryList.length === 0) {
      memoryList.push(calculator.displayValue);
    } else {
      let lastNumber = memoryList.pop(memoryList[memoryList.length - 1]);
      lastNumber = parseFloat(lastNumber) + parseFloat(calculator.displayValue);
      memoryList.push(lastNumber);
    }

    updateMemory();
  }
  if (e.target.classList.contains("mc")) {
    clearHistoryMemory();
  }

  if (e.target.classList.contains("mr")) {
    calculator.firstNumber = memoryList.pop(memoryList[memoryList.length - 1]);
    calculator.displayValue = calculator.firstNumber;
    updateDisplay();
  }
});

historyMemory.addEventListener("click", (e) => {
  if (e.target.classList.contains("item1")) {
    if (historyView !== "") {
      clearAllListMemory.style.display = "block";
    } else {
      clearAllListMemory.style.display = "none";
    }
    historyView.style.display = "block";
    memoryView.style.display = "none";
    memoryText.classList.remove("border-bottom");
    historyText.classList.add("border-bottom");
  }
  if (e.target.classList.contains("item2")) {
    if (memoryView !== "") {
      clearAllListMemory.style.display = "block";
    } else {
      clearAllListMemory.style.display = "none";
    }
    memoryView.style.display = "block";
    historyView.style.display = "none";
    historyText.classList.remove("border-bottom");
    memoryText.classList.add("border-bottom");
  }
});

clearAllListMemory.addEventListener("click", function () {
  clearHistoryMemory(historyView, mc, mr);
});
