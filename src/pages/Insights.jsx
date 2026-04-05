import React from 'react';
import InsightsPanel from '../components/insights/InsightsPanel';
import { LineChart, Sparkles, ChevronRight } from 'lucide-react';

const Insights = () => {
  return (
    <div className="animate-fade-in space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-text-dim text-xs font-bold uppercase tracking-widest mb-1">
            <span>Finance</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Insights</span>
          </div>
          <h2 className="text-3xl font-bold font-heading text-text-main">AI Financial Insights</h2>
          <p className="text-text-muted">Personalized analysis of your spending habits and trends.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-xl text-secondary text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Mode Active
          </div>
        </div>
      </div>

      <InsightsPanel />
    </div>
  );
};

export default Insights;
