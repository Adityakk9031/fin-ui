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
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] min-h-screen bg-bg-dark overflow-x-hidden">
          {/* Sidebar - Handles its own width and responsive states */}
          <Sidebar />

          {/* Main Content Wrapper - Grid ensures this fills exactly the remaining viewport space */}
          <div className="min-h-screen flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
              <div className="max-w-[1400px] mx-auto w-full">
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
