import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-xl border border-border shadow-lg">
        <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">{payload[0].name}</p>
        <p className="text-text-main text-lg font-bold">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const SpendingBreakdown = () => {
  const { state } = useApp();
  const { transactions } = state;

  // Calculate spending by category (all time)
  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const data = Object.keys(spendingByCategory)
    .map(key => {
      const category = CATEGORIES.find(c => c.id === key);
      return {
        name: category ? category.name : key,
        value: parseFloat(spendingByCategory[key].toFixed(2)),
        color: category ? category.color : '#666'
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 categories

  return (
    <div className="glass p-6 rounded-2xl border border-border h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-main font-heading">Spending Breakdown</h3>
          <p className="text-text-dim text-sm">Top 5 expense categories</p>
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span className="text-text-muted text-sm font-medium">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center -mt-4 pointer-events-none">
          <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest leading-none mb-1">Expenses</p>
          <p className="text-xl font-bold text-text-main font-heading">
            ${data.reduce((acc, curr) => acc + curr.value, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
