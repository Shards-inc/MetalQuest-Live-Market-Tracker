
import React from 'react';
import { 
  TrendingUp, 
  Gem, 
  Zap, 
  Construction, 
  Flame, 
  Pickaxe 
} from 'lucide-react';
import { MetalCategory } from './types';

export const METALS_LIST = {
  [MetalCategory.PRECIOUS]: [
    { name: 'Gold', symbol: 'XAU' },
    { name: 'Silver', symbol: 'XAG' },
    { name: 'Platinum', symbol: 'XPT' },
    { name: 'Palladium', symbol: 'XPD' },
    { name: 'Rhodium', symbol: 'XRH' },
    { name: 'Iridium', symbol: '' },
    { name: 'Ruthenium', symbol: '' },
  ],
  [MetalCategory.BASE]: [
    { name: 'Copper', symbol: 'HG' },
    { name: 'Aluminum', symbol: 'ALI' },
    { name: 'Nickel', symbol: 'NI' },
    { name: 'Zinc', symbol: 'ZNC' },
    { name: 'Lead', symbol: 'PB' },
    { name: 'Tin', symbol: 'TIN' },
  ],
  [MetalCategory.BATTERY]: [
    { name: 'Lithium', symbol: '' },
    { name: 'Cobalt', symbol: '' },
    { name: 'Manganese', symbol: '' },
    { name: 'Graphite', symbol: '' },
    { name: 'Neodymium', symbol: '' },
  ],
  [MetalCategory.FERROUS]: [
    { name: 'Iron Ore', symbol: '62% Fe' },
    { name: 'Steel HRC', symbol: '' },
    { name: 'Steel Rebar', symbol: '' },
    { name: 'Scrap Metal', symbol: '' },
  ],
  [MetalCategory.ENERGY]: [
    { name: 'Uranium', symbol: 'U3O8' },
    { name: 'Magnesium', symbol: '' },
    { name: 'Titanium', symbol: '' },
  ],
};

export const CATEGORY_ICONS = {
  [MetalCategory.PRECIOUS]: <Gem className="w-4 h-4" />,
  [MetalCategory.BASE]: <Pickaxe className="w-4 h-4" />,
  [MetalCategory.BATTERY]: <Zap className="w-4 h-4" />,
  [MetalCategory.FERROUS]: <Construction className="w-4 h-4" />,
  [MetalCategory.ENERGY]: <Flame className="w-4 h-4" />,
};

export const SYSTEM_INSTRUCTION = `
# ROLE
You are a Real-Time Metal Market Analyst and Technical Lead. Your goal is to function as a live "Ticker Tracker" for a comprehensive list of precious, industrial, and battery metals.

# CAPABILITIES
1. You must use the \`Google Search\` tool to fetch current spot prices, daily changes (%), and market trends.
2. You will provide structured, tabular data for readability.
3. You will interpret "vibe-coding" or natural language requests into technical data points.

# METALS LIST (The Tracker Scope)
- PRECIOUS: Gold (XAU), Silver (XAG), Platinum (XPT), Palladium (XPD), Rhodium (XRH), Iridium, Ruthenium.
- BASE/INDUSTRIAL: Copper (HG), Aluminum (ALI), Nickel (NI), Zinc (ZNC), Lead (PB), Tin (TIN).
- BATTERY & TECH: Lithium (Carbonate/Hydroxide), Cobalt, Manganese, Graphite, Neodymium.
- FERROUS: Iron Ore (62% Fe), Steel HRC, Steel Rebar, Scrap Metal.
- ENERGY/SPECIALTY: Uranium (U3O8), Magnesium, Titanium.

# OPERATIONAL PROTOCOL
- When asked for a "full update," generate a Markdown table including: Metal Name, Current Price (USD), Unit (Oz/Ton/Lb), 24h Change (%), and Primary Exchange (LME/COMEX/NYMEX).
- Always indicate price direction with emojis (🟢 for up, 🔴 for down, ⚪ for neutral).
- End every report with a "Market Sentiment" summary (Bullish/Bearish/Neutral).
- Today's Date is January 2026. Ensure you find the most recent available 2026 or late 2025 data.
`;
