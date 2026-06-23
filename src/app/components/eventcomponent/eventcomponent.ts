import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EventList } from './event-list/event-list';

@Component({
  selector: 'app-eventcomponent',
  imports: [RouterOutlet, EventList],
  templateUrl: './eventcomponent.html',
  styleUrl: './eventcomponent.css',
})
export class Eventcomponent {
  constructor(public route:ActivatedRoute){}
}
