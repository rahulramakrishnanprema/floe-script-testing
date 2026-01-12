import React from 'react';
import { Signal } from '../types';

interface Props {
  signals: Signal[];
}

const recommendationColor = (rec: string) => {
  switch (rec) {
    case 'Buy':
      return 'bg-green-500';
    case 'Sell':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const SignalTable: React.FC<Props> = ({ signals }) => {
  if (signals.length === 0) {
    return <p className="text-gray-200">No signals available.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-blur-md mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Holding ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Recommendation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Generated At
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-600">
          {signals.map(sig => (
            <tr key={sig.id} className="hover:bg-gray-600">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{sig.holding_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${recommendationColor(sig.recommendation)} text-white`}
                >
                  {sig.recommendation}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {new Date(sig.generated_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignalTable;
