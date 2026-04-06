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

  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden animate-fade-in"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        glass border-r border-border h-screen sticky top-0 transition-all duration-300 z-50
        fixed md:sticky left-0 
        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
        ${!isSidebarOpen && 'md:w-20'}
      `}>
        <div className="flex flex-col h-full py-6 px-4">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-10 px-2 overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl shadow-primary">
                <Wallet className="text-white w-6 h-6" />
              </div>
              {isSidebarOpen && (
                <span className="text-xl font-bold font-heading whitespace-nowrap bg-gradient-to-r from-white to-primary text-transparent bg-clip-text">
                  NeoFinance
                </span>
              )}
            </div>
            {isSidebarOpen && (
              <button onClick={toggleSidebar} className="md:hidden p-2 text-text-muted hover:text-white">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 768 && isSidebarOpen && toggleSidebar()}
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
                px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-center
                ${role === 'admin' ? 'bg-danger/10 text-danger border border-danger/20' : 'bg-success/10 text-success border border-success/20'}
              `}>
                {role === 'admin' ? 'Super Admin' : 'Viewer'}
              </div>
            </div>
          )}

          {/* Toggle Collapse (Desktop Only) */}
          <button 
            onClick={toggleSidebar}
            className="hidden md:flex mt-4 items-center justify-center p-2 rounded-xl bg-bg-card border border-border hover:bg-primary hover:text-white transition-all group shadow-sm hover:shadow-primary"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
