import React, { useState } from 'react';
import { X, Save, Plus, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const AddEditTransaction = ({ isOpen, onClose, editData }) => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState(() => {
    if (editData) {
      return {
        ...editData,
        date: new Date(editData.date).toISOString().split('T')[0],
      };
    }
    return {
      description: '',
      amount: '',
      category: 'food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    };
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date) {
      setError('Please fill in all required fields.');
      return;
    }

    const transaction = {
      ...formData,
      id: editData ? editData.id : `exp-${Date.now()}`,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    };

    if (editData) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: transaction });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="glass border border-border rounded-3xl w-full max-w-lg relative animate-fade-in overflow-hidden">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              {editData ? <Plus className="w-5 h-5 text-primary rotate-45" /> : <Plus className="w-5 h-5 text-primary" />}
            </div>
            <h2 className="text-xl font-bold font-heading">{editData ? 'Edit Transaction' : 'Add Transaction'}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-bg-card-hover transition-all">
            <X className="w-5 h-5 text-text-dim" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-center gap-3 text-sm text-danger font-medium">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-text-dim uppercase font-bold tracking-widest leading-none mb-1.5 block">Description</label>
              <input 
                type="text" 
                placeholder="Where did you spend?" 
                className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 focus:border-primary transition-all text-sm h-12"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-text-dim uppercase font-bold tracking-widest leading-none mb-1.5 block">Amount ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00" 
                  className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 focus:border-primary transition-all text-sm h-12"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] text-text-dim uppercase font-bold tracking-widest leading-none mb-1.5 block">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 focus:border-primary transition-all text-sm h-12"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-text-dim uppercase font-bold tracking-widest leading-none mb-1.5 block">Category</label>
                <select 
                  className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 focus:border-primary transition-all text-sm h-12"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-text-dim uppercase font-bold tracking-widest leading-none mb-1.5 block">Type</label>
                <select 
                  className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 focus:border-primary transition-all text-sm h-12"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 px-4 rounded-xl border border-border hover:bg-bg-card-hover text-sm font-bold text-text-muted transition-all h-12"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-primary transition-all flex items-center justify-center gap-2 h-12"
            >
              <Save className="w-4 h-4" />
              {editData ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTransaction;
