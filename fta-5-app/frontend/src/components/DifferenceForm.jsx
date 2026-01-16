import { useState } from 'react';
import { calculateDifference } from '../api/difference';

export default function DifferenceForm({ onResult }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const diff = await calculateDifference(Number(a), Number(b));
      onResult(diff);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Number A</label>
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Number B</label>
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Calculating...' : 'Calculate Difference'}
      </button>
    </form>
  );
}