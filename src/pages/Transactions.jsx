import React, { useState } from 'react';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionFilters from '../components/transactions/TransactionFilters';
import AddEditTransaction from '../components/transactions/AddEditTransaction';
import { Plus, Download, FileText, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Transactions = () => {
  const { state } = useApp();
  const { role, transactions } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (transaction) => {
    setEditData(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      t.category,
      t.type,
      t.amount
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `neo_finance_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-text-dim text-xs font-bold uppercase tracking-widest mb-1">
            <span>Finance</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Transactions</span>
          </div>
          <h1 className="text-3xl font-bold font-heading text-text-main">Transaction Log</h1>
          <p className="text-text-muted">A detailed view of all your financial activity.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {role === 'admin' && (
            <>
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border hover:border-primary-glow text-text-muted hover:text-primary rounded-xl text-sm font-semibold transition-all group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                Export CSV
              </button>
              <button 
                onClick={handleAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold shadow-primary transition-all group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Add New
              </button>
            </>
          )}
        </div>
      </div>

      <TransactionFilters />
      
      <TransactionTable onEdit={handleEdit} />

      <AddEditTransaction 
        key={isModalOpen ? (editData?.id || 'new') : 'closed'}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editData={editData} 
      />
    </div>
  );
};

export default Transactions;
