// Grab DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

/**
 * Updates the calculator display with the provided value.
 * @param {string} value - Text to show in the display.
 */
function updateDisplay(value) {
  display.value = value;
}

/**
 * Clears the current expression and the display.
 */
function clearAll() {
  expression = '';
  updateDisplay('');
}

/**
 * Safely evaluates the arithmetic expression and updates the display.
 * Supports +, -, *, / and decimal numbers.
 */
function calculate() {
  try {
    // Remove any characters that are not part of a valid arithmetic expression
    const sanitized = expression.replace(/[^-+*/0-9.]/g, '');
    // Evaluate using Function constructor in strict mode
    // eslint-disable-next-line no-new-func
    const result = Function(`'use strict'; return (${sanitized})`)();
    updateDisplay(result);
    expression = result.toString();
  } catch (e) {
    updateDisplay('Error');
    expression = '';
  }
}

/**
 * Handles input from buttons or keyboard.
 * @param {string} value - The character or command pressed.
 */
function handleInput(value) {
  if (value === 'C') {
    clearAll();
    return;
  }
  if (value === '=') {
    calculate();
    return;
  }
  // Append digit or operator to the expression
  expression += value;
  updateDisplay(expression);
}

// Attach click listeners to all calculator buttons
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent.trim();
    handleInput(val);
  });
});

// Keyboard support for numbers, operators, Enter, Backspace, Escape
document.addEventListener('keydown', e => {
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','Enter','Backspace','Escape'];
  if (!allowedKeys.includes(e.key)) return;

  if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  } else if (e.key === 'Escape') {
    clearAll();
  } else {
    handleInput(e.key);
  }
});
