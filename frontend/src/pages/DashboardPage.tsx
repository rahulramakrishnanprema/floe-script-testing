import React, { useEffect, useState } from 'react';
import PortfolioList from '../components/PortfolioList';
import HoldingEditor from '../components/HoldingEditor';
import SignalTable from '../components/SignalTable';
import Chart from '../components/Chart';
import { api } from '../services/api';
import { Portfolio, Holding, Signal } from '../types';
import { useAuth } from '../hooks/useAuth';

const generateMockPriceData = (ticker: string) => {
  const data = [];
  const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    data.push({
      date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString(),
      close: 100 + Math.random() * 20
    });
  }
  return data;
};

const DashboardPage: React.FC = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [showHoldingEditor, setShowHoldingEditor] = useState(false);
  const { logout } = useAuth();

  const fetchHoldingsAndSignals = (portfolioId: number) => {
    api
      .get<Holding[]>(`/portfolios/${portfolioId}/holdings`)
      .then(res => setHoldings(res.data))
      .catch(err => {
        console.error(err);
        setHoldings([]);
      });
    api
      .get<Signal[]>(`/portfolios/${portfolioId}/signals`)
      .then(res => setSignals(res.data))
      .catch(err => {
        console.error(err);
        setSignals([]);
      });
  };

  const handlePortfolioSelect = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    fetchHoldingsAndSignals(portfolio.id);
  };

  const handleHoldingCreated = (newHolding: Holding) => {
    setHoldings(prev => [...prev, newHolding]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <PortfolioList onSelect={handlePortfolioSelect} />
      {selectedPortfolio && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-semibold text-white">
              Portfolio: {selectedPortfolio.name}
            </h2>
            <button
              onClick={() => setShowHoldingEditor(true)}
              className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-700"
            >
              Add Holding
            </button>
          </div>
          {holdings.length > 0 ? (
            holdings.map(holding => (
              <div key={holding.id} className="mb-6">
                <Chart data={generateMockPriceData(holding.ticker)} ticker={holding.ticker} />
              </div>
            ))
          ) : (
            <p className="text-gray-200">No holdings found.</p>
          )}
          <SignalTable signals={signals} />
        </div>
      )}
      {showHoldingEditor && selectedPortfolio && (
        <HoldingEditor
          portfolioId={selectedPortfolio.id}
          onCreated={handleHoldingCreated}
          onClose={() => setShowHoldingEditor(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
