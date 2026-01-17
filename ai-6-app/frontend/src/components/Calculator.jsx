import React, { useState } from 'react';
import Display from './Display.jsx';
import ButtonGrid from './ButtonGrid.jsx';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (label, type) => {
    if (type === 'digit' || type === 'decimal') {
      setExpression(prev => prev + label);
    } else if (type === 'operator') {
      setExpression(prev => prev + ' ' + label + ' ');
    } else if (type === 'clear') {
      setExpression('');
      setResult('');
    } else if (type === 'backspace') {
      setExpression(prev => prev.slice(0, -1));
    } else if (type === 'equals') {
      try {
        // Simple evaluation using Function constructor
        const evalResult = Function(`return ${expression}`)();
        setResult(evalResult.toString());
        setExpression(evalResult.toString());
      } catch {
        setResult('Error');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      <Display value={result || expression || '0'} />
      <ButtonGrid onButtonClick={handleClick} />
    </div>
  );
}

export default Calculator;
