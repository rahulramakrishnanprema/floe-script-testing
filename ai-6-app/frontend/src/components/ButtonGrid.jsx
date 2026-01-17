import React from 'react';
import Button from './Button';

const buttons = [
  ['C', '/', '*', '-'],
  ['7', '8', '9', '+'],
  ['4', '5', '6', ''],
  ['1', '2', '3', ''],
  ['0', '.', '=', '']
];

function ButtonGrid({ onButtonClick }) {
  const getType = (label) => {
    if (label === 'C') return 'clear';
    if (label === '=') return 'equals';
    if (['+', '-', '*', '/'].includes(label)) return 'operator';
    return 'number';
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.flatMap((row, rowIndex) =>
        row.map((label, colIndex) => {
          if (!label) return null;
          return (
            <Button
              key={`${rowIndex}-${colIndex}`}
              label={label}
              type={getType(label)}
              onClick={onButtonClick}
            />
          );
        })
      )}
    </div>
  );
}

export default ButtonGrid;