import React, { useState } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        // Evaluate the expression safely
        const evalResult = eval(input);
        setResult(evalResult.toString());
      } catch (e) {
        setResult('Error');
      }
    } else {
      // Prevent consecutive operators
      const operators = ['+', '-', '*', '/'];
      const lastChar = input.slice(-1);
      if (operators.includes(value) && operators.includes(lastChar)) {
        // Replace the last operator with the new one
        setInput(input.slice(0, -1) + value);
      } else {
        setInput(input + value);
      }
    }
  };

  return (
    <div className="calculator">
      <Display input={input} result={result} />
      <ButtonGrid onButtonClick={handleClick} />
    </div>
  );
}

export default Calculator;