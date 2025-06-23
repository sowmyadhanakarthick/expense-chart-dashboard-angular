import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseList } from './expense-list';
import { ExpenseService } from '../../services/expense.service';
import { ToastService } from '../../services/toast.service';
import { Expense } from '../../models/expense.model';
import { AddExpense } from '../add-expense/add-expense';
import { ExpenseChart } from '../expense-chart/expense-chart';
import { FormsModule } from '@angular/forms';

describe('ExpenseList', () => {
  let component: ExpenseList;
  let fixture: ComponentFixture<ExpenseList>;

  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  const mockExpenses: Expense[] = [
    {
      id: '1',
      title: 'Lunch',
      amount: 150,
      category: 'Food',
      date: '2024-01-01',
    },
    {
      id: '2',
      title: 'Train',
      amount: 100,
      category: 'Travel',
      date: '2024-01-02',
    },
  ];

  beforeEach(async () => {
    expenseServiceSpy = jasmine.createSpyObj('ExpenseService', [
      'expenses',
      'deleteExpense',
      'updateExpense',
    ]);

    expenseServiceSpy.expenses.and.returnValue(mockExpenses);

    toastServiceSpy = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [ExpenseList, AddExpense, ExpenseChart, FormsModule],
      providers: [
        { provide: ExpenseService, useValue: expenseServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize expenses from the service', () => {
    const result = component.expenses();
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Lunch');
  });

  it('should open modal on editExpense() and clone expense', () => {
    component.editExpense(mockExpenses[0]);
    expect(component.selectedExpense).toEqual(mockExpenses[0]);
    expect(component.isEditModalOpen).toBeTrue();
  });

  it('should close modal and reset selectedExpense', () => {
    component.selectedExpense = mockExpenses[0];
    component.isEditModalOpen = true;
    component.closeModal();
    expect(component.selectedExpense).toBeNull();
    expect(component.isEditModalOpen).toBeFalse();
  });

  it('should filter expenses based on search term (title)', () => {
    component.searchTerm = 'lunch';
    const result = component.filteredExpenses();
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Lunch');
  });

  it('should filter expenses based on search term (category)', () => {
    component.searchTerm = 'travel';
    const result = component.filteredExpenses();
    expect(result.length).toBe(1);
    expect(result[0].category).toBe('Travel');
  });

  it('should return all expenses if search term is empty', () => {
    component.searchTerm = '';
    const result = component.filteredExpenses();
    expect(result.length).toBe(2);
  });

  it('should call deleteExpense and show toast if user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteExpense('1');
    expect(expenseServiceSpy.deleteExpense).toHaveBeenCalledWith('1');
    expect(toastServiceSpy.show).toHaveBeenCalledWith(
      'Expense deleted successfully'
    );
  });

  it('should not delete if user cancels confirm dialog', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteExpense('1');
    expect(expenseServiceSpy.deleteExpense).not.toHaveBeenCalled();
    expect(toastServiceSpy.show).not.toHaveBeenCalled();
  });

  it('should call updateExpense and close modal on handleUpdatedExpense()', () => {
    spyOn(component, 'closeModal').and.callThrough();
    const updated: Expense = { ...mockExpenses[0], amount: 500 };
    component.handleUpdatedExpense(updated);
    expect(expenseServiceSpy.updateExpense).toHaveBeenCalledWith(updated);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should get and set searchTerm properly using signal()', () => {
    component.searchTerm = 'test';
    expect(component.searchTerm).toBe('test');
  });
});
