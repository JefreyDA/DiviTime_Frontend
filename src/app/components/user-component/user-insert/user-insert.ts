import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { InsertingUsers } from '../../../models/userModels/User';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ListRole } from '../../../models/Role';
import { RoleService } from '../../../services/role-service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-insert',
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-insert.html',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }],
  styleUrl: './user-insert.css',
})
export class UserInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  user: InsertingUsers = new InsertingUsers();
  roles: ListRole[] = [];
  hidePassword = true;

  constructor(
    private Us: UserService,
    private rS: RoleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [``, [Validators.required, Validators.maxLength(50)]],
      paternalSurName: [``, [Validators.required, Validators.maxLength(50)]],
      maternalSurName: [``, [Validators.required, Validators.maxLength(50)]],
      birthDate: [``, Validators.required],
      email: [``, [Validators.required, Validators.maxLength(100)]],
      password: [``, [Validators.required, Validators.maxLength(150)]],
      idRole: [``, Validators.required],
    });

    this.rS.list().subscribe((data) => {
      this.roles = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.user.nameUser = this.form.value.name;
      this.user.paternalSurNameUser = this.form.value.paternalSurName;
      this.user.maternalSurNameUser = this.form.value.maternalSurName;
      this.user.birthDateUser = this.form.value.birthDate;
      this.user.emailUser = this.form.value.email;
      this.user.passwordUser = this.form.value.password;
      this.user.idRole = this.form.value.idRole;
      this.Us.insert(this.user).subscribe({
        next: () => {
          this.snackBar.open('Usuario registrado correctamente', 'OK', { duration: 3000, });
          this.router.navigate(['/users/insert']);
        },

        error: (err) => {
          if (err.status === 409) {
            this.snackBar.open(err.error, 'Cerrar', {
              duration: 6000,
            });
          }

          if (err.status === 400) {
            this.snackBar.open(err.error, 'Cerrar', {
              duration: 6000,
            });
          }
        },
      });
    }
  }
}
