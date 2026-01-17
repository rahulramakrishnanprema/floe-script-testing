import React from 'react';

function Display({ input, result }) {
  return (
    <div className="display">
      <div className="text-sm text-gray-600">{input}</div>
      <div className="font-mono">{result}</div>
    </div>
  );
}

export default Display;