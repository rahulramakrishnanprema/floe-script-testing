// script.js - Calculator logic
"use strict";
(() => {
  /**
   * Updates the calculator display with the current input or a default zero.
   */
  const updateDisplay = () => {
    const display = document.getElementById("display");
    display.value = currentInput || "0";
  };

  /**
   * Resets all internal state variables and clears the display.
   */
  const clearAll = () => {
    currentInput = "";
    operator = null;
    previousValue = null;
    updateDisplay();
  };

  /**
   * Performs the pending arithmetic operation and shows the result.
   */
  const calculate = () => {
    if (operator && previousValue !== null && currentInput) {
      const a = parseFloat(previousValue);
      const b = parseFloat(currentInput);
      let result;
      switch (operator) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          result = b !== 0 ? a / b : "Error";
          break;
        default:
          result = b;
      }
      currentInput = String(result);
      operator = null;
      previousValue = null;
      updateDisplay();
    }
  };

  /**
   * Central dispatcher for all button clicks, handling numbers, operators, clear, and equals.
   * @param {HTMLElement} btn - The button element that was clicked.
   */
  const handleButton = (btn) => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "clear") {
      clearAll();
      return;
    }

    if (action === "calculate") {
      calculate();
      return;
    }

    if (btn.classList.contains("operator")) {
      if (currentInput) {
        if (previousValue !== null && operator) {
          calculate();
        }
        previousValue = currentInput;
        operator = value;
        currentInput = "";
      }
      return;
    }

    // Append numbers or decimal point
    if (value) {
      // Prevent multiple decimal points
      if (value === "." && currentInput.includes(".")) return;
      currentInput += value;
      updateDisplay();
    }
  };

  // State variables
  let currentInput = "";
  let operator = null;
  let previousValue = null;

  // Attach listeners to all calculator buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => handleButton(btn));
  });

  // Initialize display on page load
  updateDisplay();
})();