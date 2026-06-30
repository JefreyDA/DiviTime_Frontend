import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AgreementType } from '../../../models/agreement-type';
import { AgreementTypeService } from '../../../services/agreement-type-service';

@Component({
  selector: 'app-agreement-type-update',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './agreement-type-update.html',
  styleUrl: './agreement-type-update.css',
})
export class AgreementTypeUpdate implements OnInit {

  form: FormGroup = new FormGroup({});
  agreementType: AgreementType = new AgreementType();

  constructor(
    private aTS: AgreementTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    });

    const id = this.route.snapshot.params['id'];

    this.aTS.listId(id).subscribe(data => {

      this.agreementType = data;

      this.form.patchValue({
        id: data.idAgreementType,
        name: data.nameAgreementType,
      });

    });

  }

  aceptar() {

    if (this.form.valid) {

      this.agreementType.idAgreementType =
        Number(this.route.snapshot.paramMap.get('id'));

      this.agreementType.nameAgreementType =
        this.form.value.name;

      this.aTS.update(this.agreementType).subscribe({
        next: () => {
          this.router.navigate(['/agreementtype/list']);
        }
      });

    }

  }

}