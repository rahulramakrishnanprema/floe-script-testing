import React from 'react';

function Button({ label, type = 'number', onClick }) {
  const base = 'w-16 h-16 rounded-md flex items-center justify-center text-xl font-semibold cursor-pointer';
  const styles = {
    number: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    operator: 'bg-primary text-white hover:bg-primary-dark',
    clear: 'bg-red-500 text-white hover:bg-red-600',
    equals: 'bg-green-500 text-white hover:bg-green-600'
  };

  return (
    <button
      className={`${base} ${styles[type]}`}
      onClick={() => onClick(label)}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default Button;