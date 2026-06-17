import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ExpenseType } from '../../../models/ExpenseType';
import { ExpenseTypeService } from '../../../services/expense-type-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-expense-type-update',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule],
  templateUrl: './expense-type-update.html',
  styleUrl: './expense-type-update.css',
})
export class ExpenseTypeUpdate implements OnInit{

  form: FormGroup = new FormGroup({});
  pro: ExpenseType = new ExpenseType();

  constructor(
    private pS: ExpenseTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {

  this.form = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  const id = this.route.snapshot.params['id'];

  this.pS.listId(id).subscribe(data => {

    this.pro = data;

    this.form.patchValue({
      id: data.idExpenseType,
      name: data.nameExpenseType,
      description: data.descriptionExpenseType
    });

  });
}

  aceptar() {
    if (this.form.valid) {

      this.pro.idExpenseType = Number(this.route.snapshot.paramMap.get('id'));
      this.pro.nameExpenseType = this.form.value.name;
      this.pro.descriptionExpenseType = this.form.value.description;

      console.log("OBJETO FINAL:", this.pro); 

      this.pS.update(this.pro).subscribe({
        next: () => {
          this.router.navigate(['/expensestype/listar']);
        },
      });
    }
  }

}
