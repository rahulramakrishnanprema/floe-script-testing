export interface Portfolio {
  id: number;
  name: string;
  client_id: number;
}

export interface Holding {
  id: number;
  ticker: string;
  quantity: number;
  portfolio_id: number;
}

export interface Signal {
  id: number;
  holding_id: number;
  generated_at: string; // ISO date string
  recommendation: 'Buy' | 'Hold' | 'Sell';
}
