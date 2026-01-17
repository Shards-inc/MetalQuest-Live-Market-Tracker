
export interface MetalData {
  name: string;
  symbol: string;
  price: string;
  unit: string;
  change24h: string;
  direction: 'up' | 'down' | 'neutral';
  exchange: string;
}

export interface MarketUpdate {
  timestamp: string;
  content: string;
  groundingSources: Array<{
    title: string;
    uri: string;
  }>;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
}

export enum MetalCategory {
  PRECIOUS = 'PRECIOUS',
  BASE = 'BASE/INDUSTRIAL',
  BATTERY = 'BATTERY & TECH',
  FERROUS = 'FERROUS',
  ENERGY = 'ENERGY/SPECIALTY'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
