import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseChart } from './expense-chart';
import { Expense } from '../../models/expense.model';
import { NgApexchartsModule } from 'ng-apexcharts';

describe('ExpenseChart', () => {
  let component: ExpenseChart;
  let fixture: ComponentFixture<ExpenseChart>;

  const mockExpenses: Expense[] = [
    {
      id: '1',
      title: 'Lunch',
      amount: 200,
      category: 'Food',
      date: '2024-01-01',
    },
    {
      id: '2',
      title: 'Train',
      amount: 150,
      category: 'Travel',
      date: '2024-01-02',
    },
    {
      id: '3',
      title: 'Dinner',
      amount: 100,
      category: 'Food',
      date: '2024-01-03',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseChart, NgApexchartsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseChart);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chartOptions on ngOnInit()', () => {
    component.expenses = mockExpenses;
    component.chartType = 'pie';
    component.ngOnInit();
    expect(component.chartOptions.series?.length).toBeGreaterThan(0);
    expect(component.chartOptions.labels?.length).toBeGreaterThan(0);
  });

  it('should call updateChart on changes to chartType', () => {
    spyOn(component as any, 'updateChart').and.callThrough();
    component.expenses = mockExpenses;
    component.ngOnChanges({
      chartType: {
        previousValue: 'pie',
        currentValue: 'bar',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect((component as any).updateChart).toHaveBeenCalled();
  });

  it('should call updateChart on changes to expenses', () => {
    spyOn(component as any, 'updateChart').and.callThrough();
    component.chartType = 'pie';
    component.ngOnChanges({
      expenses: {
        previousValue: [],
        currentValue: mockExpenses,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect((component as any).updateChart).toHaveBeenCalled();
  });

  it('should generate pie chart config for type "pie"', () => {
    const result = (component as any).generateOptions('pie', mockExpenses);
    expect(result.chart?.type).toBe('pie');
    expect(result.series?.length).toBe(2);
    expect(result.labels).toContain('Food');
  });

  it('should generate empty config if no expenses are present', () => {
    const result = (component as any).generateOptions('bar', []);
    expect(result.series?.length).toBe(0);
    expect(result.labels?.length).toBe(0);
  });

  it('should group expenses by category correctly', () => {
    const result = (component as any).groupByCategory(mockExpenses);
    expect(result['Food']).toBe(300);
    expect(result['Travel']).toBe(150);
  });

  it('should return line chart config for "line" type', () => {
    const result = (component as any).generateOptions('line', mockExpenses);
    expect(result.chart?.type).toBe('line');
    expect(result.series?.length).toBeGreaterThan(0);
  });

  it('should return bar chart config for "bar" type', () => {
    const result = (component as any).generateOptions('bar', mockExpenses);
    expect(result.chart?.type).toBe('bar');
    expect(result.series?.length).toBeGreaterThan(0);
  });
});
