import React from 'react';
import Button from './Button';

const buttons = [
  'C', '/', '*', '-',
  '7', '8', '9', '+',
  '4', '5', '6', '-',
  '1', '2', '3', '=',
  '0', '.', '', ''
];

function ButtonGrid({ onButtonClick }) {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {buttons.map((label, idx) => {
        if (!label) return <div key={idx} />;
        let type = 'digit';
        if (['+', '-', '*', '/'].includes(label)) type = 'operator';
        if (label === '=') type = 'equals';
        if (label === 'C') type = 'clear';
        if (label === '.') type = 'decimal';
        return (
          <Button
            key={idx}
            label={label}
            type={type}
            onClick={onButtonClick}
          />
        );
      })}
    </div>
  );
}

export default ButtonGrid;