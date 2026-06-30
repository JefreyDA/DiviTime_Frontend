import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AgreementType } from '../../../models/agreement-type';
import { AgreementTypeService } from '../../../services/agreement-type-service';

@Component({
  selector: 'app-agreement-type-insert',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './agreement-type-insert.html',
  styleUrl: './agreement-type-insert.css',
})
export class AgreementTypeInsert implements OnInit {

  form: FormGroup = new FormGroup({});
  agreementType: AgreementType = new AgreementType();

  constructor(
    private aTS: AgreementTypeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });

  }

  aceptar() {

    if (this.form.valid) {

      this.agreementType.nameAgreementType = this.form.value.name;

      this.aTS.insert(this.agreementType).subscribe({
        next: () => {
          this.router.navigate(['/agreementtype/list']);
        }
      });

    }

  }

}