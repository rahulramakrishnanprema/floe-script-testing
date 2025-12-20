"use strict";

/**
 * Updates the calculator display with the current input or the previous result.
 * @private
 */
function updateDisplay() {
  const display = document.getElementById('display');
  if (!display) return;
  display.value = currentInput || (previousValue !== null ? previousValue : '0');
}

/**
 * Handles numeric button clicks, appending the digit or decimal point to the current input.
 * Prevents multiple decimal points.
 * @param {string} num - The numeric character pressed.
 * @private
 */
function handleNumber(num) {
  if (num === '.' && currentInput.includes('.')) return;
  currentInput += num;
  updateDisplay();
}

/**
 * Handles operator button clicks, storing the operator and preparing for the next operand.
 * If a previous value exists and a new operand is entered, it computes the pending operation first.
 * @param {string} op - The operator character ('+', '-', '*', '/').
 * @private
 */
function handleOperator(op) {
  if (currentInput === '' && previousValue === null) return;
  if (previousValue === null) {
    previousValue = parseFloat(currentInput);
  } else if (currentInput !== '') {
    compute();
  }
  operator = op;
  currentInput = '';
}

/**
 * Performs the arithmetic operation stored in `operator` using `previousValue` and the current input.
 * Handles division by zero and updates the display with the result.
 * @private
 */
function compute() {
  const current = parseFloat(currentInput);
  if (Number.isNaN(previousValue) || Number.isNaN(current) || operator === null) return;
  let result;
  switch (operator) {
    case '+':
      result = previousValue + current;
      break;
    case '-':
      result = previousValue - current;
      break;
    case '*':
      result = previousValue * current;
      break;
    case '/':
      result = current !== 0 ? previousValue / current : 'Error';
      break;
    default:
      return;
  }
  previousValue = typeof result === 'number' ? parseFloat(result.toFixed(10)) : result;
  currentInput = '';
  operator = null;
  updateDisplay();
}

/**
 * Clears all calculator state and resets the display.
 * @private
 */
function clearAll() {
  currentInput = '';
  previousValue = null;
  operator = null;
  updateDisplay();
}

// State variables
let currentInput = '';
let operator = null;
let previousValue = null;

// Attach event listeners after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.calc-btn[data-value]');
  const clearBtn = document.getElementById('clear');
  const equalsBtn = document.getElementById('equals');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-value');
      if (/[0-9.]/.test(value)) {
        handleNumber(value);
      } else {
        handleOperator(value);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }

  if (equalsBtn) {
    equalsBtn.addEventListener('click', compute);
  }

  updateDisplay();
});