import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { format } from 'date-fns';

const TransactionTable = ({ onEdit }) => {
  const { state, dispatch } = useApp();
  const { transactions, filters, role } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const itemsPerPage = 8;

  // Filtering
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(filters.transactionSearch.toLowerCase());
    const matchesCategory = filters.category === 'all' || t.category === filters.category;
    const matchesType = filters.type === 'all' || t.type === filters.type;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Sorting
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortConfig.key === 'amount') {
      return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.date) - new Date(b.date) 
        : new Date(b.date) - new Date(a.date);
    }
    const valA = a[sortConfig.key].toString().toLowerCase();
    const valB = b[sortConfig.key].toString().toLowerCase();
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const currentTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const getCategoryColor = (catId) => {
    return CATEGORIES.find(c => c.id === catId)?.color || 'var(--text-dim)';
  };

  return (
    <div className="glass rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-dark/40 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-dim cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-2">Date <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-dim cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('description')}>
                <div className="flex items-center gap-2">Description <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-dim cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-2">Category <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-dim cursor-pointer hover:text-primary transition-colors text-right" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-2">Amount <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              {role === 'admin' && <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-dim text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {currentTransactions.length > 0 ? (
              currentTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-bg-card-hover transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-text-main">{format(new Date(t.date), 'MMM dd, yyyy')}</span>
                      <span className="text-[10px] font-bold text-text-dim uppercase tracking-wider">{format(new Date(t.date), 'HH:mm')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-bg-dark border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-all">
                        {t.type === 'income' ? <TrendingUp className="w-4 h-4 text-success" /> : <TrendingDown className="w-4 h-4 text-danger" />}
                      </div>
                      <span className="text-sm font-medium text-text-main truncate max-w-[200px]">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(t.category) }}></div>
                      <span className="text-sm text-text-muted capitalize">{t.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-bold ${t.type === 'income' ? 'text-success' : 'text-text-main'}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onEdit(t)}
                          className="p-1.5 rounded-lg hover:bg-primary/20 text-text-muted hover:text-primary transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(t.id)}
                          className="p-1.5 rounded-lg hover:bg-danger/20 text-text-muted hover:text-danger transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-12 text-center text-text-dim italic">
                  No transactions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="px-6 py-4 bg-bg-dark/20 border-t border-border flex items-center justify-between">
        <p className="text-xs text-text-dim font-bold uppercase tracking-widest">
          Showing <span className="text-text-main">{currentTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="text-text-main">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="text-text-main">{filteredTransactions.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 rounded-lg bg-bg-card border border-border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-card-hover hover:border-primary transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-primary' : 'bg-bg-card border border-border text-text-dim hover:text-text-main hover:border-text-dim'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 rounded-lg bg-bg-card border border-border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-card-hover hover:border-primary transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
