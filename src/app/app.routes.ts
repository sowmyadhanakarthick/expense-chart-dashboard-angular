import { Routes } from '@angular/router';
import { AddExpense } from './components/add-expense/add-expense';

export const routes: Routes = [
  { path: '', component: AddExpense, title: 'Add Expenses' },
  {
    path: 'list',
    loadComponent: () =>
      import('./components/expense-list/expense-list').then(
        (m) => m.ExpenseList
      ),
    title: 'View Expenses',
  },
];
