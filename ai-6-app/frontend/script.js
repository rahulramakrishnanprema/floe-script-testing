const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentValue = '0';
let operator = null;
let operand = null;
let resetDisplay = false;

function updateDisplay(value) {
  display.textContent = value;
}

function performOperation(op, a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  switch (op) {
    case '+': return numA + numB;
    case '-': return numA - numB;
    case '*': return numA * numB;
    case '/': return numB !== 0 ? numA / numB : 'Error';
    default: return b;
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === 'digit') {
      if (resetDisplay) {
        currentValue = value === '.' ? '0.' : value;
        resetDisplay = false;
      } else {
        if (currentValue === '0' && value !== '.') {
          currentValue = value;
        } else if (value === '.' && !currentValue.includes('.')) {
          currentValue += value;
        } else if (value !== '.') {
          currentValue += value;
        }
      }
      updateDisplay(currentValue);
    }

    if (action === 'operator') {
      if (operator && !resetDisplay) {
        operand = performOperation(operator, operand, currentValue);
        updateDisplay(operand);
      } else {
        operand = currentValue;
      }
      operator = btn.textContent;
      resetDisplay = true;
    }

    if (action === 'equals') {
      if (operator) {
        const result = performOperation(operator, operand, currentValue);
        updateDisplay(result);
        currentValue = result.toString();
        operator = null;
        operand = null;
        resetDisplay = true;
      }
    }

    if (action === 'clear') {
      currentValue = '0';
      operator = null;
      operand = null;
      resetDisplay = false;
      updateDisplay(currentValue);
    }
  });
});
