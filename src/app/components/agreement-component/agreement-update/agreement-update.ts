import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Agreement } from '../../../models/Agreement';
import { AgreementService } from '../../../services/agreement-service';
import { Family } from '../../../models/familyModels/Family';
import { FamilyService } from '../../../services/family-service';
import { AgreementType } from '../../../models/agreement-type';
import { AgreementTypeService } from '../../../services/agreement-type-service';

@Component({
  selector: 'app-agreement-update',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './agreement-update.html',
  styleUrl: './agreement-update.css',
})
export class AgreementUpdate implements OnInit {

  form: FormGroup = new FormGroup({});
  agreement: Agreement = new Agreement();

  familias: Family[] = [];
  tipos: AgreementType[] = [];

  constructor(
    private aS: AgreementService,
    private fS: FamilyService,
    private atS: AgreementTypeService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      family: ['', Validators.required],
      agreementType: ['', Validators.required],
    });

    this.fS.list().subscribe(data => this.familias = data);
    this.atS.list().subscribe(data => this.tipos = data);

    const id = this.route.snapshot.params['id'];

    this.aS.listId(id).subscribe(data => {

      this.agreement = data;

      this.form.patchValue({
        id: data.idAgreement,
        title: data.titleAgreement,
        description: data.descriptionAgreement,
        date: data.creationDate,
        family: data.idFamily,
        agreementType: data.idAgreementType
      });

    });

  }

  aceptar() {

    if (this.form.valid) {

      this.agreement.idAgreement =
        Number(this.route.snapshot.paramMap.get('id'));

      this.agreement.titleAgreement = this.form.value.title;
      this.agreement.descriptionAgreement = this.form.value.description;
      this.agreement.creationDate = this.form.value.date;
      this.agreement.idFamily = this.form.value.family;
      this.agreement.idAgreementType = this.form.value.agreementType;

      this.aS.update(this.agreement).subscribe(() => {
        this.router.navigate(['/agreement/list']);
      });

    }

  }

}