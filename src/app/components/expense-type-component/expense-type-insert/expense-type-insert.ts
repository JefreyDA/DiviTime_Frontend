import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseType } from '../../../models/ExpenseType';
import { ExpenseTypeService } from '../../../services/expense-type-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-type-insert',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule],
  templateUrl: './expense-type-insert.html',
  styleUrl: './expense-type-insert.css',
})
export class ExpenseTypeInsert implements OnInit{
  form: FormGroup = new FormGroup({});
  pro: ExpenseType = new ExpenseType();

  constructor(
    private pS: ExpenseTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
       
      },
    );
  }

  aceptar() {
    if (this.form.valid) {
      this.pro.nameExpenseType = this.form.value.name;
      this.pro.descriptionExpenseType = this.form.value.description;
      this.pS.insert(this.pro).subscribe({
        next: () => {
          this.router.navigate(['/expensestype/listar']);
        },
      });
    }
  }

}
