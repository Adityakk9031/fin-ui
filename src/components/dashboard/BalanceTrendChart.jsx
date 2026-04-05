import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { format, subMonths, endOfMonth, eachMonthOfInterval } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-xl border border-border shadow-lg">
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white text-lg font-bold">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const BalanceTrendChart = () => {
  const { state } = useApp();
  const { transactions } = state;

  // Prepare data for the last 6 months
  const today = new Date();
  const last6Months = eachMonthOfInterval({
    start: subMonths(today, 5),
    end: today,
  });

  const chartData = last6Months.map(month => {
    const monthEnd = endOfMonth(month);
    const monthLabel = format(month, 'MMM');

    // Calculate balance at the end of this month
    const balanceAtEnd = transactions
      .filter(t => new Date(t.date) <= monthEnd)
      .reduce((acc, curr) => {
        return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
      }, 0);

    return {
      name: monthLabel,
      balance: parseFloat(balanceAtEnd.toFixed(2)),
    };
  });

  return (
    <div className="glass p-6 rounded-2xl border border-border h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white font-heading">Balance Trend</h3>
          <p className="text-zinc-500 text-sm">Monthly balance accumulation</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-violet-500/10 text-violet-400 text-xs font-bold rounded-lg uppercase tracking-wide border border-violet-500/20">
          Last 6 Months
        </div>
      </div>
      
      <div className="flex-1 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              domain={['auto', 'auto']}
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrendChart;
