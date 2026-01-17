import React from 'react';
import Button from './Button';

const buttons = [
  ['C', '/', '*', '-'],
  ['7', '8', '9', '+'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '+'],
  ['0', '.', '=', '+'],
];

export default function ButtonGrid({ onButtonClick }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.flat().map((label, idx) => (
        <Button
          key={idx}
          onClick={() => onButtonClick(label)}
          className={label === 'C' ? 'bg-red-500 hover:bg-red-600' : ''}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
