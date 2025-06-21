import { Injectable, signal, computed } from '@angular/core';
import { Expense } from '../models/expense.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private _expenses = signal<Expense[]>([]);
  expenses = this._expenses.asReadonly();

  addExpense(expense: Omit<Expense, 'id'>) {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
    };
    this._expenses.update((prev) => [...prev, newExpense]);
  }

  deleteExpense(id: string) {
    this._expenses.update((prev) => prev.filter((exp) => exp.id !== id));
  }

  updateExpense(updatedExpense: Expense) {
    const current = this._expenses();
    const index = current.findIndex((exp) => exp.id === updatedExpense.id);

    if (index !== -1) {
      const updated = [...current];
      updated[index] = updatedExpense;
      this._expenses.set(updated);
    }
  }
}
