
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../types';
import { streamMarketAnalysis } from '../services/geminiService';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedInput = input.trim();
    
    if (!sanitizedInput || isLoading) return;
    if (sanitizedInput.length > 500) {
      setError("Message too long. Please keep under 500 characters.");
      return;
    }

    setError(null);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: sanitizedInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      let accumulated = '';
      await streamMarketAnalysis(sanitizedInput, (chunk) => {
        accumulated += chunk;
        setMessages(prev => 
          prev.map(msg => msg.id === assistantId ? { ...msg, content: accumulated } : msg)
        );
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Connection failed.");
      setMessages(prev => 
        prev.map(msg => msg.id === assistantId ? { ...msg, content: 'Technical Error: Could not reach market data. Check your connection or API configuration.' } : msg)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800 w-full max-w-md shadow-2xl">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-500 w-5 h-5" />
          <h2 className="font-semibold text-zinc-100">Market AI Analyst</h2>
        </div>
        <div className="flex items-center gap-2">
          {error && <AlertTriangle className="text-rose-500 w-4 h-4 animate-pulse" />}
          <div className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 uppercase tracking-widest font-bold">
            Live Search
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
              <Bot className="text-emerald-500" />
            </div>
            <div>
              <p className="text-zinc-100 font-medium">Ready for your queries</p>
              <p className="text-xs text-zinc-500 mt-1 italic leading-relaxed">
                "How is the battery sector doing today?"<br/>
                "Is Silver outperforming Gold?"<br/>
                "What's driving the Copper price surge?"
              </p>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-900/10' 
                : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-50">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span className="text-[10px] uppercase font-bold tracking-tighter">
                  {msg.role === 'user' ? 'You' : 'Analyst'}
                </span>
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-invert prose-emerald max-w-none">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1].content === '' && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl rounded-tl-none">
              <Loader2 className="animate-spin text-emerald-500 w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-md">
        {error && (
          <div className="mb-2 text-[10px] text-rose-500 flex items-center gap-1">
            <AlertTriangle size={10} />
            {error}
          </div>
        )}
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            maxLength={500}
            placeholder="Ask about market trends..."
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-zinc-600"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="mt-2 text-[8px] text-zinc-600 uppercase tracking-widest text-right px-1">
          {input.length}/500 chars
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
