import React from 'react';

function Display({ expression, result, error }) {
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-md min-h-20">
      <div className="text-right text-sm text-gray-500">{expression || '0'}</div>
      <div className={`text-right text-3xl font-mono ${error ? 'text-red-600' : 'text-black'}`}>{result}</div>
    </div>
  );
}

export default Display;