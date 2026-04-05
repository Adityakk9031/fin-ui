import { subDays } from 'date-fns';

export const CATEGORIES = [
  { id: 'housing', name: 'Housing', icon: 'Home', color: '#6366f1' },
  { id: 'food', name: 'Food & Dining', icon: 'Utensils', color: '#f43f5e' },
  { id: 'transport', name: 'Transport', icon: 'Car', color: '#f59e0b' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', color: '#ec4899' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', color: '#8b5cf6' },
  { id: 'utilities', name: 'Utilities', icon: 'Zap', color: '#06b6d4' },
  { id: 'health', name: 'Health', icon: 'HeartPulse', color: '#10b981' },
];

const MOCK_DESCRIPTIONS = {
  housing: ['Rent Payment', 'Mortgage', 'Property Tax', 'Home Insurance'],
  food: ['Whole Foods', 'Stripe Coffee', 'Uber Eats', 'Blue Bottle', 'Sweetgreen', 'Chipotle'],
  transport: ['Uber', 'Lyft', 'Gas Station', 'Tesla Supercharger', 'Metro Pass'],
  shopping: ['Amazon', 'Apple Store', 'Nike', 'Uniqlo', 'Sephora', 'Home Depot'],
  entertainment: ['Netflix', 'Spotify', 'AMC Theatres', 'Steam Purchase', 'Nintendo eShop'],
  utilities: ['Verizon Wireless', 'PG&E', 'Water Bill', 'Internet'],
  health: ['CVS Pharmacy', 'Gym Membership', 'Blue Shield', 'Dental Cleaning'],
  income: ['Monthly Salary', 'Freelance Project', 'Dividend Payout', 'Tax Refund'],
};

const generateMockTransactions = () => {
  const transactions = [];
  const today = new Date();
  
  // Generate data for the last 180 days
  for (let i = 0; i < 180; i++) {
    const date = subDays(today, i);
    
    // Add salary on the 1st of each month
    if (date.getDate() === 1) {
      transactions.push({
        id: `sal-${i}`,
        date: date.toISOString(),
        description: 'Monthly Salary',
        category: 'income',
        type: 'income',
        amount: 5200.00,
      });
    }

    // Add some random expenses
    const numExpenses = Math.floor(Math.random() * 3); // 0-2 expenses per day
    for (let j = 0; j < numExpenses; j++) {
      const categoryId = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id;
      const descriptions = MOCK_DESCRIPTIONS[categoryId];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      let amount = 0;
      if (categoryId === 'housing') amount = 1200 + Math.random() * 500;
      else if (categoryId === 'food') amount = 15 + Math.random() * 80;
      else if (categoryId === 'transport') amount = 10 + Math.random() * 60;
      else if (categoryId === 'shopping') amount = 20 + Math.random() * 300;
      else if (categoryId === 'entertainment') amount = 10 + Math.random() * 50;
      else if (categoryId === 'utilities') amount = 40 + Math.random() * 100;
      else if (categoryId === 'health') amount = 30 + Math.random() * 150;

      transactions.push({
        id: `exp-${i}-${j}`,
        date: date.toISOString(),
        description,
        category: categoryId,
        type: 'expense',
        amount: parseFloat(amount.toFixed(2)),
      });
    }
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const INITIAL_TRANSACTIONS = generateMockTransactions();
