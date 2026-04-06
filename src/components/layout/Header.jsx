import React from 'react';
import { Search, User, Bell, LayoutGrid, ChevronDown, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { state, dispatch } = useApp();
  const { role, filters } = state;

  const handleRoleChange = (e) => {
    dispatch({ type: 'SET_ROLE', payload: e.target.value });
  };

  return (
    <header className="sticky top-0 z-40 h-20 w-full glass border-b border-border px-4 md:px-8 flex items-center justify-between gap-4">
      <div className="flex-1 flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="md:hidden p-2 rounded-xl bg-bg-card border border-border hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative group w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-violet-500 transition-all z-10" />
          <input 
            type="text" 
            placeholder="Search transactions, insights..." 
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/80 border-white/10 border rounded-xl focus:bg-black transition-all text-white placeholder:text-zinc-600 outline-none"
            value={filters.globalSearch}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { globalSearch: e.target.value } })}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher */}
        <div className="flex items-center gap-3 bg-bg-card/50 border border-border rounded-xl px-3 py-1.5 hover:border-primary-glow transition-all">
          <div className="text-right flex flex-col">
            <span className="text-[10px] text-text-dim uppercase font-bold tracking-widest leading-none mb-0.5">Active Role</span>
            <select 
              className="bg-transparent border-none p-0 text-sm font-semibold text-text-main focus:ring-0 cursor-pointer h-5 overflow-hidden"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-text-dim" />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-bg-card/50 border border-border hover:bg-bg-card hover:border-primary-glow transition-all group">
          <Bell className="w-5 h-5 text-text-muted group-hover:text-primary transition-all" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-bg-dark"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-border h-8">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-text-main">Alex Rivera</div>
            <div className="text-xs text-text-dim uppercase tracking-wider font-medium">{role === 'admin' ? 'Super Admin' : 'Read Only'}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg">
            <div className="w-full h-full rounded-[9px] bg-bg-dark flex items-center justify-center">
              <User className="text-primary w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
