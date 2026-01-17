
import React, { useState, useEffect } from 'react';
import { RefreshCw, LayoutDashboard, Globe, AlertCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { getMarketUpdate } from '../services/geminiService';
import MetalCard from './MetalCard';
import { METALS_LIST, CATEGORY_ICONS } from '../constants';
import { MetalCategory } from '../types';

const MarketDashboard: React.FC = () => {
  const [report, setReport] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchUpdate = async () => {
    setLoading(true);
    try {
      const data = await getMarketUpdate();
      setReport(data.text);
      setSources(data.sources);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdate();
  }, []);

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-black p-6 space-y-8 no-scrollbar">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <LayoutDashboard className="text-emerald-500" />
            MarketPulse <span className="text-emerald-500 font-normal italic">HQ</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Institutional-grade metal market tracking and real-time analysis.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800">
          <div className="flex flex-col items-end px-3">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Global Status</span>
            <span className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Connected
            </span>
          </div>
          <button 
            onClick={fetchUpdate}
            disabled={loading}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh Tickers
          </button>
        </div>
      </header>

      {/* Top Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetalCard name="Gold (XAU)" price="$2,845.20" change="1.2%" direction="up" unit="oz" />
        <MetalCard name="Copper (HG)" price="$4.32" change="0.8%" direction="up" unit="lb" />
        <MetalCard name="Lithium Carb." price="$12,400" change="3.5%" direction="down" unit="ton" />
        <MetalCard name="Uranium (U3O8)" price="$88.50" change="0.2%" direction="neutral" unit="lb" />
      </section>

      {/* Main Analysis View */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="text-emerald-500 w-4 h-4" />
                <h3 className="text-sm font-semibold text-zinc-100">Full Market Assessment</h3>
              </div>
              {lastUpdated && <span className="text-[10px] text-zinc-500 mono uppercase">Updated {lastUpdated}</span>}
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <LoaderIcon className="animate-spin w-8 h-8 text-emerald-500" />
                  <p className="text-sm animate-pulse">Consulting global markets via Google Search...</p>
                </div>
              ) : (
                <div className="prose prose-invert prose-emerald max-w-none prose-sm">
                  {report ? (
                    <div dangerouslySetInnerHTML={{ 
                      __html: report
                        .replace(/#/g, '') // Simple markdown to plain-ish text cleanup
                        .split('\n').map(line => `<p class="mb-2 leading-relaxed">${line}</p>`).join('') 
                    }} />
                  ) : (
                    <div className="flex items-center gap-2 text-zinc-500">
                      <AlertCircle size={16} />
                      <p>No report generated. Click refresh to begin scan.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Grounding Sources */}
            {sources.length > 0 && (
              <div className="p-4 bg-zinc-950/50 border-t border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="text-zinc-500 w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Grounding References</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sources.slice(0, 4).map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.web?.uri || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 transition-colors"
                    >
                      {source.web?.title || 'Market Source'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar categories */}
        <div className="space-y-4">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              Tracking Scope
            </h3>
            <div className="space-y-4">
              {Object.entries(METALS_LIST).map(([cat, metals]) => (
                <div key={cat} className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 uppercase tracking-tight opacity-70">
                    {CATEGORY_ICONS[cat as MetalCategory]}
                    {cat}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {metals.map(m => (
                      <span key={m.name} className="px-2 py-0.5 rounded-md bg-zinc-800/50 border border-zinc-800 text-[10px] text-zinc-300">
                        {m.name} {m.symbol && `(${m.symbol})`}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-2xl p-4">
            <h3 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Market Logic</h3>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
              "System configured for 2026 data parity. Utilizing Real-Time Grounding for spot price verification across LME, COMEX, and NYMEX."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default MarketDashboard;
