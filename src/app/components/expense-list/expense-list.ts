import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { ToastService } from '../../services/toast.service';
import { ExpenseChart } from '../expense-chart/expense-chart';
import { AddExpense } from '../add-expense/add-expense';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, ExpenseChart, AddExpense, FormsModule, RouterModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList {
  constructor(
    private expenseService: ExpenseService,
    private toastService: ToastService
  ) {}

  expenses = computed(() => this.expenseService.expenses());
  isEditModalOpen = false;
  selectedExpense: Expense | null = null;

  private _searchTerm = signal('');
  get searchTerm() {
    return this._searchTerm();
  }
  set searchTerm(value: string) {
    this._searchTerm.set(value);
  }

  deleteExpense(id: string) {
    const confirmed = confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      this.expenseService.deleteExpense(id);
      this.toastService.show('🗑️ Expense deleted successfully'); // ✅ Toast shown
    }
  }

  editExpense(expense: Expense) {
    this.selectedExpense = { ...expense };
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.selectedExpense = null;
    this.isEditModalOpen = false;
  }

  handleUpdatedExpense(updated: Expense) {
    this.expenseService.updateExpense(updated);
    this.closeModal();
  }

  filteredExpenses = computed(() => {
    const term = this.searchTerm.toLowerCase();
    return this.expenses().filter(
      (exp) =>
        exp.title.toLowerCase().includes(term) ||
        exp.category.toLowerCase().includes(term)
    );
  });
}
