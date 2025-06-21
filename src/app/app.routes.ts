import { Routes } from '@angular/router';
import { AddExpense } from './components/add-expense/add-expense';
import { ExpenseList } from './components/expense-list/expense-list';

export const routes: Routes = [
  { path: '', component: AddExpense },
  { path: 'list', component: ExpenseList },
];
