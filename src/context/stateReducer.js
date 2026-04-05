import { INITIAL_TRANSACTIONS } from '../data/mockData';

export const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || INITIAL_TRANSACTIONS,
  role: localStorage.getItem('role') || 'admin',
  filters: {
    globalSearch: '',
    transactionSearch: '',
    category: 'all',
    type: 'all',
    dateRange: 'all',
  },
  isSidebarOpen: true,
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const newTransactions = [action.payload, ...state.transactions];
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      return { ...state, transactions: newTransactions };
    }
    case 'EDIT_TRANSACTION': {
      const newTransactions = state.transactions.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      return { ...state, transactions: newTransactions };
    }
    case 'DELETE_TRANSACTION': {
      const newTransactions = state.transactions.filter((t) => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      return { ...state, transactions: newTransactions };
    }
    case 'SET_ROLE': {
      localStorage.setItem('role', action.payload);
      return { ...state, role: action.payload };
    }
    case 'SET_FILTERS': {
      return { ...state, filters: { ...state.filters, ...action.payload } };
    }
    case 'TOGGLE_SIDEBAR': {
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    }
    case 'RESET_TRANSACTIONS': {
      localStorage.setItem('transactions', JSON.stringify(INITIAL_TRANSACTIONS));
      return { ...state, transactions: INITIAL_TRANSACTIONS };
    }
    default:
      return state;
  }
}
