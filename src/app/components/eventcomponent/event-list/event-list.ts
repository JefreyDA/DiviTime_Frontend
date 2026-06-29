import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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

@Component({
  selector: 'app-event-list',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink,
    AsyncPipe,
    FullCalendarModule
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit, AfterViewInit {
  listEvents: Event[] = [];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource<Event>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    height: 'auto',
  };

  constructor(private eS: Eventservice) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarEventos() {
    this.eS.list().subscribe({
      next: (data) => {
        this.listEvents = data;
        this.dataSource.data = data;
        this.updateCalendar(data);
      },
    });
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
      this.eS.list().subscribe((data) => {
        this.listEvents = data;
        this.dataSource.data = data;
        this.updateCalendar(data);
      });
    });
  }
}