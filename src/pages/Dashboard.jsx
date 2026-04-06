import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { state } = useApp();
  const { role, isLoading } = state;

  if (isLoading) {
    return (
      <div className="animate-fade-in space-y-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-3xl bg-bg-card/40 border border-border animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-80 rounded-3xl bg-bg-card/40 border border-border animate-pulse"></div>
          <div className="lg:col-span-1 h-80 rounded-3xl bg-bg-card/40 border border-border animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 rounded-3xl bg-bg-card/40 border border-border animate-pulse"></div>
          <div className="h-64 rounded-3xl bg-bg-card/40 border border-border animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-heading text-text-main">Financial Overview</h1>
          <p className="text-text-muted">Welcome back, Alex. Your finances are looking solid this month.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm font-semibold">
            Last updated: Today, 11:45 AM
          </div>
          {role === 'admin' && (
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold shadow-primary transition-all">
              Generate Report
            </button>
          )}
        </div>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-1">
          <SpendingBreakdown />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-bold text-text-main font-heading mb-4">Quick Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-success/5 border border-success/10">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <span className="text-success font-bold">!</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-main">Spending Down 12%</p>
                <p className="text-xs text-text-dim mt-0.5">Your food spending has decreased significantly compared to last month. Great job!</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/5 border border-secondary/10">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-secondary font-bold">?</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-main">Subscription Alert</p>
                <p className="text-xs text-text-dim mt-0.5">We noticed 3 active streaming subscriptions. You might want to review them.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-bold text-text-main font-heading mb-4">Upcoming Bills</h3>
          <div className="space-y-3">
            {[
              { name: 'Netflix Premium', date: 'In 3 days', amount: '$19.99' },
              { name: 'Verizon Wireless', date: 'In 5 days', amount: '$85.00' },
              { name: 'Property Tax', date: 'In 12 days', amount: '$450.00' },
            ].map((bill, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-card-hover transition-all border border-transparent hover:border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bg-dark border border-border flex items-center justify-center text-xs font-bold text-text-muted">
                    {bill.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-main">{bill.name}</p>
                    <p className="text-[10px] text-text-dim font-bold uppercase tracking-widest">{bill.date}</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-text-main">{bill.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
