import { ExpenseService } from './expense.service';
import { Expense } from '../models/expense.model';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(() => {
    service = new ExpenseService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty expenses', () => {
    expect(service.expenses()).toEqual([]);
  });

  it('should add a new expense with a generated id', () => {
    const inputExpense = {
      title: 'Lunch',
      amount: 200,
      category: 'Food',
      date: '2024-01-01',
    };

    service.addExpense(inputExpense);

    const expenses = service.expenses();
    expect(expenses.length).toBe(1);
    expect(expenses[0].title).toBe('Lunch');
    expect(expenses[0].id).toBeTruthy();
  });

  it('should delete an existing expense by id', () => {
    service.addExpense({
      title: 'Item 1',
      amount: 100,
      category: 'Misc',
      date: '2024-01-01',
    });
    service.addExpense({
      title: 'Item 2',
      amount: 200,
      category: 'Bills',
      date: '2024-01-02',
    });

    const allExpenses = service.expenses();
    const idToDelete = allExpenses[0].id;

    service.deleteExpense(idToDelete);

    const updated = service.expenses();
    expect(updated.length).toBe(1);
    expect(updated.find((exp) => exp.id === idToDelete)).toBeUndefined();
  });

  it('should not change anything if deleteExpense is called with invalid id', () => {
    service.addExpense({
      title: 'Test',
      amount: 123,
      category: 'Test',
      date: '2024-01-01',
    });
    const original = service.expenses();

    service.deleteExpense('invalid-id');

    expect(service.expenses()).toEqual(original);
  });

  it('should update an existing expense correctly', () => {
    service.addExpense({
      title: 'Book',
      amount: 300,
      category: 'Study',
      date: '2024-02-01',
    });

    const added = service.expenses()[0];
    const updatedExpense: Expense = {
      ...added,
      title: 'Updated Book',
      amount: 350,
    };

    service.updateExpense(updatedExpense);

    const updated = service.expenses();
    expect(updated.length).toBe(1);
    expect(updated[0].title).toBe('Updated Book');
    expect(updated[0].amount).toBe(350);
  });

  it('should not update anything if id does not match', () => {
    service.addExpense({
      title: 'Gadget',
      amount: 999,
      category: 'Electronics',
      date: '2024-03-01',
    });

    const original = service.expenses();

    service.updateExpense({
      id: 'non-existent-id',
      title: 'Fake',
      amount: 1000,
      category: 'Fake',
      date: '2024-03-02',
    });

    expect(service.expenses()).toEqual(original);
  });
});
