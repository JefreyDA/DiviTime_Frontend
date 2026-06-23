import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Event } from '../../../models/eventModels/Event';
import { Eventservice } from '../../../services/event-service';

@Component({
  selector: 'app-event-update',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './event-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './event-update.css',
})
export class EventUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  ev: Event = new Event();
  id: number = 0;

  constructor(
    private eS: Eventservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      details: ['', [Validators.required, Validators.maxLength(100)]],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      creationdate: ['', Validators.required],
      location: ['', [Validators.required, Validators.maxLength(50)]],
      iduser: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init() {
    this.eS.listId(this.id).subscribe(data => {
      this.form.patchValue({
        id: data.idEvent,
        title: data.titleEvent,
        details: data.detailsEvent,
        startdate: new Date(data.startDateEvent),
        enddate: new Date(data.endDateEvent),
        creationdate: new Date(data.creationDateEvent),
        location: data.locationEvent,
        iduser: data.idUser,
      });
    });
  }

  fechasValidas(): boolean {
    const startdate = new Date(this.form.value.startdate);
    const enddate = new Date(this.form.value.enddate);
    return enddate > startdate;
  }

  aceptar() {
    if (this.form.valid) {
      if (!this.fechasValidas()) {
        this.snackBar.open('La fecha fin debe ser mayor que la fecha inicio', 'Cerrar', { duration: 3000 });
        return;
      }

      this.ev.idEvent = this.form.value.id;
      this.ev.titleEvent = this.form.value.title;
      this.ev.detailsEvent = this.form.value.details;
      this.ev.startDateEvent = this.form.value.startdate;
      this.ev.endDateEvent = this.form.value.enddate;
      this.ev.creationDateEvent = this.form.value.creationdate;
      this.ev.locationEvent = this.form.value.location;
      this.ev.idUser = this.form.value.iduser;

      this.eS.update(this.ev).subscribe({
        next: () => {
          this.snackBar.open('Evento actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/events/list']);
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/events/list']);
  }
}