import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-add-expense',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.scss',
})
export class AddExpense {
  @Input() expenseToEdit: Expense | null = null;
  @Output() expenseUpdated = new EventEmitter<Expense>();
  maxDate = new Date().toISOString().split('T')[0];
  form: FormGroup;

  editing = false;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      category: [null, Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.expenseToEdit) {
      this.populateForm(this.expenseToEdit);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenseToEdit'] && this.expenseToEdit) {
      this.populateForm(this.expenseToEdit);
    }
  }

  populateForm(exp: Expense) {
    this.form.setValue({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      if (this.expenseToEdit) {
        this.expenseUpdated.emit({
          ...this.expenseToEdit,
          ...formValue,
        });
        this.toastService.show('✅ Expense updated successfully');
      } else {
        this.expenseService.addExpense(formValue);
        this.toastService.show('✅ Expense added successfully');
      }

      this.form.reset({
        title: '',
        amount: null,
        category: null,
        date: '',
      });
    }
  }

  get isEditMode(): boolean {
    return !!this.expenseToEdit;
  }
}
