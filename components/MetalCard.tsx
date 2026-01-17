
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetalCardProps {
  name: string;
  price: string;
  change: string;
  direction: 'up' | 'down' | 'neutral';
  unit: string;
}

const MetalCard: React.FC<MetalCardProps> = ({ name, price, change, direction, unit }) => {
  const isUp = direction === 'up';
  const isDown = direction === 'down';

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-emerald-500/30 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{name}</span>
        <div className={`p-1.5 rounded-lg ${
          isUp ? 'bg-emerald-500/10 text-emerald-500' : 
          isDown ? 'bg-rose-500/10 text-rose-500' : 
          'bg-zinc-500/10 text-zinc-500'
        }`}>
          {isUp ? <TrendingUp size={14} /> : isDown ? <TrendingDown size={14} /> : <Minus size={14} />}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-white mono">{price}</span>
        <span className="text-[10px] text-zinc-500 uppercase">{unit}</span>
      </div>
      <div className={`text-xs mt-1 font-medium ${
        isUp ? 'text-emerald-500' : isDown ? 'text-rose-500' : 'text-zinc-500'
      }`}>
        {isUp ? '+' : ''}{change}
      </div>
    </div>
  );
};

export default MetalCard;
