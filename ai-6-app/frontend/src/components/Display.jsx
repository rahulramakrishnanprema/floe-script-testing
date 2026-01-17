import React from 'react';

export default function Display({ value }) {
  return (
    <div className="bg-gray-200 rounded p-4 mb-4 text-right text-2xl font-mono overflow-hidden">
      {value}
    </div>
  );
}
