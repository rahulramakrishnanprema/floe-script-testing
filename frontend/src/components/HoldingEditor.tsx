import React, { useState } from 'react';
import { api } from '../services/api';
import { Holding } from '../types';

interface Props {
  portfolioId: number;
  onCreated: (holding: Holding) => void;
  onClose: () => void;
}

const HoldingEditor: React.FC<Props> = ({ portfolioId, onCreated, onClose }) => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity);
    if (!ticker || Number.isNaN(qty) || qty <= 0) {
      setError('Please provide a valid ticker and positive quantity.');
      return;
    }
    try {
      const res = await api.post<Holding>(`/portfolios/${portfolioId}/holdings`, {
        ticker,
        quantity: qty,
        portfolio_id: portfolioId
      });
      onCreated(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to create holding.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 rounded-lg p-6 w-96 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Holding</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Ticker</label>
          <input
            type="text"
            value={ticker}
            onChange={e => setTicker(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            step="any"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default HoldingEditor;
