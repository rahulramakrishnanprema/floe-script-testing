import React, { useState, useEffect } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [error, setError] = useState(false);

  const evaluateExpression = (expr) => {
    try {
      // eslint-disable-next-line no-new-func
      const res = Function(`return ${expr}`)();
      return res.toString();
    } catch {
      return 'Error';
    }
  };

  const handleButtonClick = (label) => {
    if (label === 'C') {
      setExpression('');
      setResult('0');
      setError(false);
    } else if (label === '=') {
      const res = evaluateExpression(expression);
      setResult(res);
      setError(res === 'Error');
    } else {
      setExpression((prev) => prev + label);
      setError(false);
    }
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.'].includes(key)) {
      e.preventDefault();
      handleButtonClick(key);
    } else if (key === 'Enter') {
      e.preventDefault();
      handleButtonClick('=');
    } else if (key === 'Backspace') {
      e.preventDefault();
      setExpression((prev) => prev.slice(0, -1));
    } else if (key === 'Escape') {
      e.preventDefault();
      handleButtonClick('C');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
      <Display expression={expression} result={result} error={error} />
      <ButtonGrid onButtonClick={handleButtonClick} />
    </div>
  );
}

export default Calculator;