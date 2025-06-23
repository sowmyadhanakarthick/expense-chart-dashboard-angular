import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExpense } from './add-expense';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ToastService } from '../../services/toast.service';
import { Expense } from '../../models/expense.model';

describe('AddExpense Component', () => {
  let component: AddExpense;
  let fixture: ComponentFixture<AddExpense>;
  let mockExpenseService: jasmine.SpyObj<ExpenseService>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    mockExpenseService = jasmine.createSpyObj('ExpenseService', ['addExpense']);
    mockToastService = jasmine.createSpyObj('ToastService', ['show']);

    TestBed.configureTestingModule({
      imports: [AddExpense, ReactiveFormsModule],
      providers: [
        { provide: ExpenseService, useValue: mockExpenseService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpense);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with default values', () => {
    const formValue = component.form.value;
    expect(formValue.title).toBe('');
    expect(formValue.amount).toBeNull();
    expect(formValue.category).toBeNull();
    expect(formValue.date).toBe('');
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(mockExpenseService.addExpense).not.toHaveBeenCalled();
    expect(mockToastService.show).not.toHaveBeenCalled();
  });
  it('should call addExpense when form is valid and non editing mode', () => {
    component.form.setValue({
      title: 'Groceries',
      amount: 100,
      category: 'Food',
      date: '2024-01-01',
    });

    component.onSubmit();

    expect(mockExpenseService.addExpense).toHaveBeenCalledWith({
      title: 'Groceries',
      amount: 100,
      category: 'Food',
      date: '2024-01-01',
    });
    expect(mockToastService.show).toHaveBeenCalledWith(
      'Expense added successfully'
    );
  });
  it('should emit expenseUpdated when in edit mode', () => {
    const expenseToEdit: Expense = {
      id: '1',
      title: 'Bus Ticket',
      amount: 50,
      category: 'Travel',
      date: '2024-01-05',
    };

    component.expenseToEdit = expenseToEdit;
    component.ngOnInit();
    fixture.detectChanges();

    component.form.setValue({
      title: 'Bus Ticket',
      amount: 60,
      category: 'Travel',
      date: '2024-01-05',
    });

    spyOn(component.expenseUpdated, 'emit');

    component.onSubmit();

    expect(component.expenseUpdated.emit).toHaveBeenCalledWith({
      id: '1',
      title: 'Bus Ticket',
      amount: 60,
      category: 'Travel',
      date: '2024-01-05',
    });

    expect(mockToastService.show).toHaveBeenCalledWith(
      'Expense updated successfully'
    );
  });
  it('should populate the form when expenseToEdit is set via ngOnChanges', () => {
    const expense: Expense = {
      id: 'abc',
      title: 'Electricity',
      amount: 500,
      category: 'Utilities',
      date: '2024-03-15',
    };

    component.ngOnChanges({
      expenseToEdit: {
        currentValue: expense,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.form.value).toBeDefined();
  });
  it('should return true for isEditMode if expenseToEdit is set', () => {
    component.expenseToEdit = {
      id: '1',
      title: 'Coffee',
      amount: 40,
      category: 'Food',
      date: '2024-05-01',
    };
    expect(component.isEditMode).toBeTrue();
  });

  it('should return false for isEditMode if expenseToEdit is null', () => {
    component.expenseToEdit = null;
    expect(component.isEditMode).toBeFalse();
  });

  it('should reset the form after submission', () => {
    component.form.setValue({
      title: 'Test',
      amount: 200,
      category: 'Others',
      date: '2024-01-01',
    });

    component.onSubmit();

    expect(component.form.value).toEqual({
      title: '',
      amount: null,
      category: null,
      date: '',
    });
  });
});
