import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

interface PricePoint {
  date: string; // ISO string
  close: number;
}

interface Props {
  data: PricePoint[];
  ticker: string;
}

const Chart: React.FC<Props> = ({ data, ticker }) => {
  // Ensure data is sorted by date ascending for proper chart rendering
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-md mt-4">
      <h3 className="text-lg font-semibold text-white mb-2">{ticker} Price Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" tickFormatter={d => new Date(d).toLocaleDateString()} stroke="white" />
          <YAxis domain={['auto', 'auto']} stroke="white" />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }}
            labelFormatter={d => new Date(d).toLocaleString()}
          />
          <Line type="monotone" dataKey="close" stroke="#34D399" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
