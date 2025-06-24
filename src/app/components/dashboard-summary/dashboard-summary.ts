import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-dashboard-summary',
  imports: [CommonModule],
  templateUrl: './dashboard-summary.html',
  styleUrl: './dashboard-summary.scss',
})
export class DashboardSummary implements OnChanges {
  @Input() expenses: Expense[] = [];

  totalMonthlyExpense = 0;
  topCategory = '';
  totalTransactions = 0;
  highestExpense = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.calculateMetrics();
    }
  }

  private calculateMetrics(): void {
    if (!this.expenses.length) {
      this.totalMonthlyExpense = 0;
      this.topCategory = '';
      this.totalTransactions = 0;
      this.highestExpense = 0;
      return;
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthExpenses = this.expenses.filter((exp) => {
      const date = new Date(exp.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    this.totalMonthlyExpense = currentMonthExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );
    this.totalTransactions = currentMonthExpenses.length;
    this.highestExpense = currentMonthExpenses.length
      ? Math.max(...currentMonthExpenses.map((e) => e.amount))
      : 0;

    const categoryTotals: Record<string, number> = {};
    currentMonthExpenses.forEach((exp) => {
      categoryTotals[exp.category] =
        (categoryTotals[exp.category] || 0) + exp.amount;
    });

    this.topCategory =
      Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
  }
}
