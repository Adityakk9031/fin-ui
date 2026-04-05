import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex min-h-screen bg-bg-dark">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
            <Header />
            <main className="flex-1 p-8">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/insights" element={<Insights />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
