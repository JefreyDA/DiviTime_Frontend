import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Eventservice } from '../../../services/event-service';
import { Event } from '../../../models/eventModels/Event';
import { provideClientHydration } from '@angular/platform-browser';

@Component({
  selector: 'app-event-list',
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit {
  listEvents: Event[] = []

  constructor(private eS: Eventservice) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eS.list().subscribe({
      next: (data) => {
        this.listEvents = data;
      },
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.listEvents = data;
      });
    });
  }
}
