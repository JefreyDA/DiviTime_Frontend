import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Expense } from '../../../models/expenseModels/Expense';
import { ExpenseType } from '../../../models/ExpenseType';
import { InsertingUsers } from '../../../models/userModels/User';
import { ExpenseService } from '../../../services/expense-service';
import { ExpenseTypeService } from '../../../services/expense-type-service';
import { UserService } from '../../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-expense-update',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,MatRadioModule],
  templateUrl: './expense-update.html',
  styleUrl: './expense-update.css',
})
export class ExpenseUpdate implements OnInit{
  form: FormGroup = new FormGroup({});
  pro: Expense = new Expense();
  listaTipo: ExpenseType[] = [];
  listaUsuario: InsertingUsers[] = [];

  constructor(
    private pS: ExpenseService,
    private gS: ExpenseTypeService,
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    this.gS.list().subscribe(data => {
      this.listaTipo = data;
    });
    this.uS.list().subscribe(data => {
      this.listaUsuario = data;
    });
    this.form = this.formBuilder.group(
      {
        id: [''],
        monto:['', Validators.required],
        descripcion:['', Validators.required],
        url:['', Validators.required],
        tipo:['', Validators.required],
        usuario:['', Validators.required],
        dia:['', Validators.required],
        estado:[false, Validators.required],
       
      },
    );

    const id = this.route.snapshot.params['id'];

    this.pS.listId(id).subscribe(data => {

    this.pro = data;

    this.form.patchValue({
      id: data.idExpense,
      monto:data.amountExpense,
      url: data.urlImageVoucherExpense,
      descripcion: data.descriptionExpense,
      dia:data.dateExpense,
      estado:data.statusExpense,
      tipo:data.idExpenseType,
      usuario:data.idUser

    });

  });
  }

  aceptar() {
    if (this.form.valid) {
      this.pro.idExpense = Number(this.route.snapshot.paramMap.get('id'));
      this.pro.amountExpense = this.form.value.monto;
      this.pro.descriptionExpense = this.form.value.descripcion;
      this.pro.urlImageVoucherExpense = this.form.value.url;
      this.pro.idExpenseType = this.form.value.tipo;
      this.pro.idUser = this.form.value.usuario;
      this.pro.statusExpense=this.form.value.estado;
      this.pro.dateExpense=this.form.value.dia;
   
      this.pS.update(this.pro).subscribe({
        next: () => {
          this.router.navigate(['/expense/listar']);
        },
      });
    }
  }

}


