import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSummary } from './dashboard-summary';
import { Expense } from '../../models/expense.model';
import { CommonModule } from '@angular/common';

describe('DashboardSummary', () => {
  let component: DashboardSummary;
  let fixture: ComponentFixture<DashboardSummary>;

  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  const createExpense = (overrides: Partial<Expense> = {}): Expense => ({
    id: crypto.randomUUID(),
    title: 'Test Expense',
    amount: 0,
    category: 'Misc',
    date: new Date().toISOString(),
    ...overrides,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DashboardSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSummary);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle empty expenses', () => {
    component.expenses = [];
    component.ngOnChanges({
      expenses: {
        currentValue: [],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.totalMonthlyExpense).toBe(0);
    expect(component.totalTransactions).toBe(0);
    expect(component.highestExpense).toBe(0);
    expect(component.topCategory).toBe('');
  });

  it('should ignore past month expenses', () => {
    const pastDate = new Date(thisYear, thisMonth - 2, 5).toISOString();

    component.expenses = [
      createExpense({
        title: 'Old Expense',
        amount: 999,
        date: pastDate,
        category: 'Travel',
      }),
    ];

    component.ngOnChanges({ expenses: {} as any });

    expect(component.totalMonthlyExpense).toBe(0);
    expect(component.totalTransactions).toBe(0);
    expect(component.highestExpense).toBe(0);
    expect(component.topCategory).toBe('');
  });

  it('should calculate all metrics for current month', () => {
    component.expenses = [
      createExpense({ title: 'Groceries', amount: 1200, category: 'Food' }),
      createExpense({ title: 'Metro Pass', amount: 600, category: 'Travel' }),
      createExpense({ title: 'Dinner Out', amount: 800, category: 'Food' }),
      createExpense({
        title: 'Electricity Bill',
        amount: 1600,
        category: 'Utilities',
      }),
    ];

    component.ngOnChanges({ expenses: {} as any });

    expect(component.totalMonthlyExpense).toBe(1200 + 600 + 800 + 1600);
    expect(component.totalTransactions).toBe(4);
    expect(component.highestExpense).toBe(1600);
    expect(component.topCategory).toBe('Food');
  });

  it('should correctly handle highest expense when only one exists', () => {
    component.expenses = [createExpense({ title: 'Metro Pass', amount: 600 })];

    component.ngOnChanges({ expenses: {} as any });

    expect(component.totalMonthlyExpense).toBe(600);
    expect(component.totalTransactions).toBe(1);
    expect(component.highestExpense).toBe(600);
    expect(component.topCategory).toBe('Misc');
  });

  it('should correctly parse custom date formats if needed', () => {
    const validCustomDate = new Date().toLocaleDateString('en-US');
    const parsedDate = new Date(validCustomDate).toISOString();

    component.expenses = [
      createExpense({
        title: 'Groceries',
        amount: 500,
        date: parsedDate,
        category: 'Food',
      }),
    ];

    component.ngOnChanges({ expenses: {} as any });

    expect(component.totalMonthlyExpense).toBe(500);
    expect(component.totalTransactions).toBe(1);
    expect(component.highestExpense).toBe(500);
    expect(component.topCategory).toBe('Food');
  });
});
