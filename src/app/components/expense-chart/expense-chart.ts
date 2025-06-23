import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartOptions,
  pieChartConfig,
  getStackedMonthlyBreakdownData,
  getMonthlyLineChartData,
} from './expense-chart.config';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-chart',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './expense-chart.html',
  styleUrl: './expense-chart.scss',
})
export class ExpenseChart implements OnInit, OnChanges {
  @Input() chartType: 'pie' | 'bar' | 'line' = 'pie';
  @Input() expenses: Expense[] = [];

  chartOptions: Partial<ChartOptions> = {};

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartType'] || changes['expenses']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.chartOptions = this.generateOptions(this.chartType, this.expenses);
  }

  private generateOptions(
    type: 'pie' | 'bar' | 'line',
    expenses: Expense[]
  ): Partial<ChartOptions> {
    if (!expenses?.length) {
      return {
        series: [],
        chart: { type },
        labels: [],
      };
    }

    switch (type) {
      case 'line':
        return getMonthlyLineChartData(expenses);
      case 'bar':
        return getStackedMonthlyBreakdownData(expenses);
      case 'pie': {
        const grouped = this.groupByCategory(expenses);
        const labels = Object.keys(grouped);
        const values = Object.values(grouped);
        return pieChartConfig(labels, values);
      }
    }
  }

  private groupByCategory(expenses: Expense[]): Record<string, number> {
    return expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);
  }
}
