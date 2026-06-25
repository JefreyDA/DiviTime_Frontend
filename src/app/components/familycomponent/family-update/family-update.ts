import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamilyService } from '../../../services/family-service';
import { Family } from '../../../models/familyModels/Family';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-family-update',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './family-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './family-update.css',
})
export class FamilyUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  fa: Family = new Family();
  id: number = 0;

  constructor(
    private fS: FamilyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      creationdate: ['', Validators.required],
      linkinvitation: ['', [Validators.required, Validators.maxLength(50)]],
      idcreator: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init() {
    this.fS.listId(this.id).subscribe(data => {
      this.form.patchValue({
        id: data.idFamily,
        name: data.nameFamily,
        creationdate: new Date(data.creationDate),
        linkinvitation: data.linkInvitationFamily,
        idcreator: data.idCreatorFamily
      });
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.fa.idFamily = this.form.value.id;
      this.fa.nameFamily = this.form.value.name;
      this.fa.creationDate = this.form.value.creationdate;
      this.fa.linkInvitationFamily = this.form.value.linkinvitation;
      this.fa.idCreatorFamily = this.form.value.idcreator;

      this.fS.update(this.fa).subscribe({
        next: () => {
          this.snackBar.open('Familia actualizada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/families/list']);
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/families/list']);
  }
}
