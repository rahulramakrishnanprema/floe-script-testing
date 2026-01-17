import React from 'react';

function Button({ label, type, onClick }) {
  const baseClass = 'button';
  const typeClass = {
    operator: 'operator',
    equals: 'equals',
    clear: 'clear',
    decimal: 'decimal'
  }[type] || '';

  return (
    <button
      className={`${baseClass} ${typeClass}`.trim()}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

export default Button;