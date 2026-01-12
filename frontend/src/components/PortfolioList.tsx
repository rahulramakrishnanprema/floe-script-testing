import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Portfolio } from '../types';

interface Props {
  onSelect: (portfolio: Portfolio) => void;
}

const PortfolioList: React.FC<Props> = ({ onSelect }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Portfolio[]>('/portfolios')
      .then(res => setPortfolios(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load portfolios. Showing mock data.');
        // Fallback mock data
        setPortfolios([
          { id: 1, name: 'Mock Portfolio A', client_id: 101 },
          { id: 2, name: 'Mock Portfolio B', client_id: 102 }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading portfolios...</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-blur-md">
      {error && <p className="p-2 text-red-300">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Client ID
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-600">
          {portfolios.map(p => (
            <tr key={p.id} className="hover:bg-gray-600 cursor-pointer" onClick={() => onSelect(p)}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{p.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{p.client_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-300 hover:text-indigo-100">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioList;
