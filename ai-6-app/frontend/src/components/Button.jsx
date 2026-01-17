import React from 'react';

function Button({ label, type, onClick }) {
  const base = 'w-16 h-16 rounded-md text-xl font-semibold flex items-center justify-center m-1';
  const typeClasses = {
    digit: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    decimal: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    operator: 'bg-blue-500 text-white hover:bg-blue-600',
    equals: 'bg-green-500 text-white hover:bg-green-600',
    clear: 'bg-red-500 text-white hover:bg-red-600',
    backspace: 'bg-yellow-500 text-white hover:bg-yellow-600'
  };
  const classes = `${base} ${typeClasses[type] || 'bg-gray-200 text-gray-800'}`;

  return (
    <button className={classes} onClick={() => onClick(label, type)}>
      {label}
    </button>
  );
}

export default Button;
