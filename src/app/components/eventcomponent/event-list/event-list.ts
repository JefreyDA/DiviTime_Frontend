import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Eventservice } from '../../../services/event-service';
import { Event } from '../../../models/eventModels/Event';
import { AsyncPipe } from '@angular/common';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LoginService } from '../../../services/login-service';
import { UserService } from '../../../services/user-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

type FiltroTipo = 'todos' | 'mios' | 'familia';

@Component({
  selector: 'app-event-list',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSnackBarModule,
    RouterLink,
    AsyncPipe,
    FullCalendarModule,
    FormsModule,
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit, AfterViewInit {
  listEvents: Event[] = [];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource<Event>();
  filtroSeleccionado: FiltroTipo = 'todos';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    height: 'auto',
  };

  constructor(
    private eS: Eventservice,
    private loginService: LoginService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onFiltroChange() {
    this.cargarEventos();
  }

  cargarEventos() {
    if (this.filtroSeleccionado === 'todos') {
      this.eS.list().subscribe({
        next: (data) => this.aplicarDatos(data),
        error: () => this.aplicarDatos([]),
      });
      return;
    }

    const email = this.loginService.showEmail();
    if (!email) {
      this.snackBar.open('No se pudo identificar al usuario, vuelve a iniciar sesión', 'Cerrar', { duration: 3000 });
      return;
    }

    this.userService.getByEmail(email).subscribe({
      next: (user) => {
        if (this.filtroSeleccionado === 'mios') {
          this.eS.listByUser(user.idUser).subscribe({
            next: (data) => this.aplicarDatos(data),
            error: () => this.aplicarDatos([]), 
          });
        } else if (this.filtroSeleccionado === 'familia') {
          if (!user.idFamily) {
            this.aplicarDatos([]);
            this.snackBar.open('No perteneces a ninguna familia', 'Cerrar', { duration: 3000 });
            return;
          }
          this.eS.listByFamily(user.idFamily).subscribe({
            next: (data) => this.aplicarDatos(data),
            error: () => this.aplicarDatos([]), 
          });
        }
      },
      error: () => {
        this.snackBar.open('No se pudo obtener el usuario', 'Cerrar', { duration: 3000 });
      }
    });
  }

  private aplicarDatos(data: Event[]) {
    this.listEvents = data;
    this.dataSource.data = data;
    this.updateCalendar(data);
  }

  private updateCalendar(data: Event[]) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(
      data.map((e) => ({
        id: e.idEvent.toString(),
        title: e.titleEvent,
        start: e.startDateEvent,
        end: e.endDateEvent,
      }))
    );
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.cargarEventos();
    });
  }
}