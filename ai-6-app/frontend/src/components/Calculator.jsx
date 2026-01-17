import React, { useState } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  };

  const performCalculation = (first, second, operator) => {
    const firstNum = parseFloat(first);
    const secondNum = parseFloat(second);
    if (operator === '+') return firstNum + secondNum;
    if (operator === '-') return firstNum - secondNum;
    if (operator === '*') return firstNum * secondNum;
    if (operator === '/') return secondNum === 0 ? 'Error' : firstNum / secondNum;
    return secondNum;
  };

  const handleOperator = (nextOperator) => {
    const inputValue = displayValue;
    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator && !waitingForSecondOperand) {
      const result = performCalculation(firstOperand, displayValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handleButtonClick = (value) => {
    if (value === 'C') {
      clearAll();
      return;
    }
    if (value === '=') {
      handleEquals();
      return;
    }
    if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
      return;
    }
    if (value === '.') {
      inputDecimal();
      return;
    }
    inputDigit(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-80">
      <Display value={displayValue} />
      <ButtonGrid onButtonClick={handleButtonClick} />
    </div>
  );
}
