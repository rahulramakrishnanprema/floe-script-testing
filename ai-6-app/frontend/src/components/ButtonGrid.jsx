import React from 'react';
import Button from './Button.jsx';

const buttons = [
  [{ label: 'C', type: 'clear' }, { label: '⌫', type: 'backspace' }, { label: '/', type: 'operator' }],
  [{ label: '7', type: 'digit' }, { label: '8', type: 'digit' }, { label: '9', type: 'digit' }, { label: '*', type: 'operator' }],
  [{ label: '4', type: 'digit' }, { label: '5', type: 'digit' }, { label: '6', type: 'digit' }, { label: '-', type: 'operator' }],
  [{ label: '1', type: 'digit' }, { label: '2', type: 'digit' }, { label: '3', type: 'digit' }, { label: '+', type: 'operator' }],
  [{ label: '0', type: 'digit' }, { label: '.', type: 'decimal' }, { label: '=', type: 'equals' }]
];

function ButtonGrid({ onButtonClick }) {
  return (
    <div className="grid grid-cols-4 justify-items-center">
      {buttons.flat().map((btn, idx) => (
        <Button key={idx} label={btn.label} type={btn.type} onClick={onButtonClick} />
      ))}
    </div>
  );
}

export default ButtonGrid;
