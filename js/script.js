// js/script.js
"use strict";
(() => {
  /**
   * Updates the calculator display.
   * @param {string|number} value - The value to show on the display.
   */
  const updateDisplay = (value) => {
    display.value = String(value);
  };

  /**
   * Handles numeric and decimal button presses.
   * @param {string} num - The digit or decimal point pressed.
   */
  const handleNumber = (num) => {
    if (waitingForSecond) {
      updateDisplay(num);
      waitingForSecond = false;
    } else {
      // Prevent multiple leading zeros
      if (display.value === "0" && num !== ".") {
        updateDisplay(num);
      } else {
        // Prevent multiple decimals in the same number
        if (num === "." && display.value.includes('.')) {
          return;
        }
        updateDisplay(display.value + num);
      }
    }
  };

  /**
   * Stores the selected operator and prepares for the next operand.
   * @param {string} op - One of '+', '-', '*', '/'.
   */
  const handleOperator = (op) => {
    if (firstOperand === null) {
      firstOperand = parseFloat(display.value);
    } else if (!waitingForSecond) {
      const result = calculate(firstOperand, parseFloat(display.value), operator);
      firstOperand = typeof result === "number" ? result : null;
      updateDisplay(result);
    }
    operator = op;
    waitingForSecond = true;
  };

  /**
   * Executes the arithmetic operation.
   * @param {number} a - First operand.
   * @param {number} b - Second operand.
   * @param {string} op - Operator.
   * @returns {number|string} Result or 'Error' on division by zero.
   */
  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Error';
      default:
        return b;
    }
  };

  /**
   * Computes the final result when '=' is pressed.
   */
  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, parseFloat(display.value), operator);
      updateDisplay(result);
      firstOperand = null;
      operator = null;
      waitingForSecond = false;
    }
  };

  /**
   * Resets the calculator to its initial state.
   */
  const handleClear = () => {
    updateDisplay('0');
    firstOperand = null;
    operator = null;
    waitingForSecond = false;
  };

  // ----- Initialization -----
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn[data-value]');
  const clearBtn = document.getElementById('clear');
  const equalsBtn = document.getElementById('equals');

  let firstOperand = null;
  let operator = null;
  let waitingForSecond = false;

  // Set initial display value
  updateDisplay('0');

  // Attach event listeners to number/operator buttons
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-value');
      if (!isNaN(value) || value === '.') {
        handleNumber(value);
      } else {
        handleOperator(value);
      }
    });
  });

  clearBtn.addEventListener('click', handleClear);
  equalsBtn.addEventListener('click', handleEquals);
})();