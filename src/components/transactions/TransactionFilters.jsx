import React from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const TransactionFilters = () => {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const handleFilterChange = (key, value) => {
    dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: { transactionSearch: '', category: 'all', type: 'all', dateRange: 'all' } });
  };

  const hasActiveFilters = filters.transactionSearch !== '' || filters.category !== 'all' || filters.type !== 'all' || filters.dateRange !== 'all';

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 z-10" />
          <input 
            type="text" 
            placeholder="Search by description..." 
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/80 border-white/10 border rounded-xl focus:border-violet-500/50 transition-all text-sm text-white placeholder:text-zinc-600 outline-none"
            value={filters.transactionSearch}
            onChange={(e) => handleFilterChange('transactionSearch', e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="relative min-w-[160px]">
          <select 
            className="w-full pl-4 pr-10 py-2.5 bg-zinc-900/80 border-white/10 border rounded-xl appearance-none focus:border-violet-500/50 transition-all text-sm cursor-pointer text-white outline-none"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>

        {/* Date Range Filter */}
        <div className="relative min-w-[160px]">
          <select 
            className="w-full pl-4 pr-10 py-2.5 bg-zinc-900/80 border-white/10 border rounded-xl appearance-none focus:border-violet-500/50 transition-all text-sm cursor-pointer text-white outline-none"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="this-month" className="bg-zinc-900">This Month</option>
            <option value="last-30-days" className="bg-zinc-900">Last 30 Days</option>
            <option value="this-year" className="bg-zinc-900">This Year</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>

        {/* Type Filter */}
        <div className="relative min-w-[140px]">
          <select 
            className="w-full pl-4 pr-10 py-2.5 bg-zinc-900/80 border-white/10 border rounded-xl appearance-none focus:border-violet-500/50 transition-all text-sm cursor-pointer text-white outline-none"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income" className="bg-zinc-900">Income</option>
            <option value="expense" className="bg-zinc-900">Expense</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest leading-none">Suggestions:</span>
        {['Rent', 'Netflix', 'Salary', 'Uber'].map(tag => (
          <button 
            key={tag}
            onClick={() => handleFilterChange('transactionSearch', tag)}
            className="px-2 py-1 text-[10px] font-bold text-zinc-400 hover:text-violet-400 bg-zinc-900 border border-white/5 rounded-lg hover:border-violet-500/30 transition-all uppercase tracking-wide"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionFilters;
