import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const InsightsPanel = () => {
  const { state } = useApp();
  const { transactions } = state;

  // Calculate insights
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const thisMonthExpenses = transactions
    .filter(t => t.type === 'expense' && isWithinInterval(new Date(t.date), { start: thisMonthStart, end: thisMonthEnd }))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const lastMonthExpenses = transactions
    .filter(t => t.type === 'expense' && isWithinInterval(new Date(t.date), { start: lastMonthStart, end: lastMonthEnd }))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenseChange = lastMonthExpenses > 0 
    ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 
    : 0;

  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const topCategory = Object.keys(spendingByCategory).reduce((a, b) => 
    spendingByCategory[a] > spendingByCategory[b] ? a : b, 
    'food'
  );
  
  const topCategoryName = CATEGORIES.find(c => c.id === topCategory)?.name || topCategory;
  const topCategoryAmount = spendingByCategory[topCategory] || 0;
  const totalExpenses = Object.values(spendingByCategory).reduce((a, b) => a + b, 0);
  const topCategoryPercent = totalExpenses > 0 ? (topCategoryAmount / totalExpenses) * 100 : 0;

  const insights = [
    {
      title: 'Top Spending Category',
      value: topCategoryName,
      description: `You've spent $${topCategoryAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} on ${topCategoryName.toLowerCase()}, which is ${topCategoryPercent.toFixed(1)}% of your total expenses.`,
      icon: PieChart,
      color: 'primary',
      trend: `${topCategoryPercent.toFixed(0)}% of total`,
      trendUp: true
    },
    {
      title: 'Month-over-Month',
      value: expenseChange > 0 ? 'Increased' : 'Decreased',
      description: `Your spending this month is ${Math.abs(expenseChange).toFixed(1)}% ${expenseChange > 0 ? 'higher' : 'lower'} than last month.`,
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      color: expenseChange > 0 ? 'danger' : 'success',
      trend: `${Math.abs(expenseChange).toFixed(1)}%`,
      trendUp: expenseChange < 0
    },
    {
      title: 'Savings Potential',
      value: '$240/mo',
      description: 'Based on your coffee and dining habits, you could save up to $240 monthly by reducing takeout by 40%.',
      icon: Lightbulb,
      color: 'secondary',
      trend: 'Actionable',
      trendUp: true
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-border group hover:border-primary-glow transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-bg-dark border border-border group-hover:border-${insight.color}/50 transition-all shadow-sm`}>
                <insight.icon className={`w-5 h-5 text-${insight.color === 'primary' ? 'primary' : insight.color === 'secondary' ? 'secondary' : insight.color === 'success' ? 'success' : 'danger'}`} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${insight.trendUp ? 'text-success' : 'text-danger'}`}>
                {insight.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {insight.trend}
              </div>
            </div>
            <h3 className="text-sm font-bold text-text-dim uppercase tracking-widest mb-1">{insight.title}</h3>
            <p className="text-xl font-bold text-text-main mb-2">{insight.value}</p>
            <p className="text-sm text-text-muted leading-relaxed">{insight.description}</p>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-3xl border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary text-white shadow-primary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-text-main">Smart Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-bg-dark/50 border border-border hover:border-primary/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-main mb-1">Upcoming Subscription Spike</p>
                <p className="text-xs text-text-muted">You have 4 subscriptions renewing next week totaling $142. Ensure your balance is sufficient.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-bg-dark/50 border border-border hover:border-primary/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-main mb-1">Investment Opportunity</p>
                <p className="text-xs text-text-muted">Your savings account has exceeded its target. Consider moving $2,000 to an Index Fund for better returns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Leaderboard */}
      <div className="glass p-8 rounded-3xl border border-border">
        <h2 className="text-xl font-bold font-heading text-text-main mb-6">Spending Concentration</h2>
        <div className="space-y-6">
          {Object.keys(spendingByCategory)
            .sort((a, b) => spendingByCategory[b] - spendingByCategory[a])
            .slice(0, 5)
            .map((catId, index) => {
              const category = CATEGORIES.find(c => c.id === catId);
              const amount = spendingByCategory[catId];
              const percentage = (amount / totalExpenses) * 100;
              return (
                <div key={catId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text-dim w-4">{index + 1}.</span>
                      <span className="text-sm font-semibold text-text-main">{category?.name || catId}</span>
                    </div>
                    <span className="text-sm font-bold text-text-main">${amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
                  </div>
                  <div className="h-2 w-full bg-bg-dark rounded-full overflow-hidden border border-border">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: category?.color || 'var(--primary)',
                        boxShadow: `0 0 10px ${category?.color}44`
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
