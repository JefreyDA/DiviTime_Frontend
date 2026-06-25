import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Family } from '../../../models/familyModels/Family';
import { FamilyService } from '../../../services/family-service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-family-insert',
  imports: [
    MatInputModule, 
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './family-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './family-insert.css',
})
export class FamilyInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  fa: Family = new Family();

  constructor(
    private fS: FamilyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      creationdate: ['', Validators.required],
      linkinvitation: ['', [Validators.required, Validators.maxLength(50)]],
      idcreator: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.fa.nameFamily = this.form.value.name;
      this.fa.creationDate = this.form.value.creationdate;
      this.fa.linkInvitationFamily = this.form.value.linkinvitation;
      this.fa.idCreatorFamily = this.form.value.idcreator;
      this.fS.insert(this.fa).subscribe({
        next: () => {
          this.snackBar.open('Evento registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.form.reset();
          this.router.navigate(['/families/list']);
        },
      });
    }
  }
  
  cancelar() {
    this.router.navigate(['/families/list']);
  }
}
