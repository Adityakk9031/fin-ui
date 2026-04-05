import { createContext, useContext } from 'react';

// This is a plain .js file, so it's safe to export the Context and the Hook here.
export const AppContext = createContext();

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
