import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FamilyService } from '../../../services/family-service';
import { LoginService } from '../../../services/login-service';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-family-join',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './family-join.html',
  styleUrl: './family-join.css',
})
export class FamilyJoin implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fS: FamilyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      link: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      const email = this.loginService.showEmail();

      if (!email) {
        this.snackBar.open('No se pudo identificar al usuario, vuelve a iniciar sesión', 'Cerrar', { duration: 3000 });
        return;
      }

      this.userService.getByEmail(email).subscribe({
        next: (user) => {
          this.fS.joinFamily(user.idUser, this.form.value.link).subscribe({
            next: () => {
              this.snackBar.open('Te uniste a la familia exitosamente', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/families/list']);
            },
          });
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/families/list']);
  }
}