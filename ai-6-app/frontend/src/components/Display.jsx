import React from 'react';

function Display({ value }) {
  return (
    <div className="bg-gray-200 rounded p-4 mb-4 text-right text-2xl font-mono overflow-x-auto">
      {value}
    </div>
  );
}

export default Display;
