import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SummaryCards = () => {
  const { state } = useApp();
  const { transactions } = state;

  // Calculate stats
  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const savingsRate = totalIncome > 0 
    ? ((totalIncome - totalExpenses) / totalIncome) * 100 
    : 0;

  const cards = [
    {
      title: 'Total Balance',
      value: `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Wallet,
      trend: '+12.5%',
      trendUp: true,
      color: 'primary'
    },
    {
      title: 'Total Income',
      value: `$${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      trend: '+8.2%',
      trendUp: true,
      color: 'success'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingDown,
      trend: '-4.1%',
      trendUp: false,
      color: 'danger'
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      trend: '+2.4%',
      trendUp: true,
      color: 'secondary'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="glass p-6 rounded-2xl border border-border hover:border-primary-glow transition-all group relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 bg-${card.color}`}></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2.5 rounded-xl bg-bg-dark border border-border group-hover:border-primary/50 transition-all shadow-sm`}>
              <card.icon className={`w-5 h-5 text-${card.color === 'primary' ? 'primary' : card.color === 'secondary' ? 'secondary' : card.color === 'success' ? 'success' : 'danger'}`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${card.trendUp ? 'text-success' : 'text-danger'}`}>
              {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {card.trend}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-text-dim text-sm font-medium uppercase tracking-wider">{card.title}</p>
            <h3 className="text-2xl font-bold tracking-tight text-text-main">{card.value}</h3>
          </div>
        </div>
      ))}
      
      {/* Dynamic colors for tailwind if not explicitly in config */}
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-primary { background-color: var(--primary); }
        .bg-secondary { background-color: var(--secondary); }
        .bg-success { background-color: var(--success); }
        .bg-danger { background-color: var(--danger); }
        .text-primary { color: var(--primary); }
        .text-secondary { color: var(--secondary); }
        .text-success { color: var(--success); }
        .text-danger { color: var(--danger); }
      `}} />
    </div>
  );
};

export default SummaryCards;
