import { Expense } from '../models/expense.model';

export const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Groceries',
    amount: 1200,
    category: 'Food',
    date: '2025-06-01',
  },
  {
    id: '2',
    title: 'Uber Ride',
    amount: 300,
    category: 'Travel',
    date: '2025-06-03',
  },
  {
    id: '3',
    title: 'Electricity Bill',
    amount: 1800,
    category: 'Utilities',
    date: '2025-06-05',
  },
];
