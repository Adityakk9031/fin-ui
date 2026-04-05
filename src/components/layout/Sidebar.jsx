import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ReceiptIndianRupee, 
  LineChart, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const { isSidebarOpen, role } = state;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ReceiptIndianRupee },
    { name: 'Insights', path: '/insights', icon: LineChart },
  ];

  return (
    <aside className={`glass border-r border-border h-screen sticky top-0 transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full py-6 px-4">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-10 overflow-hidden">
          <div className="bg-primary p-2 rounded-xl shadow-primary">
            <Wallet className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <span className="text-xl font-bold font-heading whitespace-nowrap bg-gradient-to-r from-white to-primary text-transparent bg-clip-text">
              NeoFinance
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                ${isActive ? 'bg-primary text-white shadow-primary' : 'text-text-muted hover:bg-bg-card-hover hover:text-white'}
              `}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isSidebarOpen ? '' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Role Badge */}
        {isSidebarOpen && (
          <div className="mt-auto px-2 py-4 border-t border-border">
            <div className={`
              px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider
              ${role === 'admin' ? 'bg-danger/10 text-danger border border-danger/20' : 'bg-success/10 text-success border border-success/20'}
            `}>
              Role: {role}
            </div>
          </div>
        )}

        {/* Toggle Collapse */}
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="mt-4 flex items-center justify-center p-2 rounded-xl bg-bg-card border border-border hover:bg-primary hover:text-white transition-all group shadow-sm hover:shadow-primary"
        >
          {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
