import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Eventservice } from '../../../services/event-service';
import { Event } from '../../../models/eventModels/Event';

@Component({
  selector: 'app-event-insert',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './event-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './event-insert.css',
})
export class EventInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  ev: Event = new Event();

  constructor(
    private eS: Eventservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      details: ['', [Validators.required, Validators.maxLength(100)]],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      creationdate: ['', Validators.required],
      location: ['', [Validators.required, Validators.maxLength(50)]],
      iduser: ['', Validators.required],
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

      this.ev.titleEvent = this.form.value.title;
      this.ev.detailsEvent = this.form.value.details;
      this.ev.startDateEvent = this.form.value.startdate;
      this.ev.endDateEvent = this.form.value.enddate;
      this.ev.creationDateEvent = this.form.value.creationdate;
      this.ev.locationEvent = this.form.value.location;
      this.ev.idUser = this.form.value.iduser;

      this.eS.insert(this.ev).subscribe({
        next: () => {
          this.snackBar.open('Evento registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.form.reset();
          this.router.navigate(['/events/list']);
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/events/list']);
  }
}