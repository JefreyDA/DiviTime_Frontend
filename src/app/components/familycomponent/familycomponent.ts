import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FamilyList } from './family-list/family-list';

@Component({
  selector: 'app-familycomponent',
  imports: [RouterOutlet, FamilyList],
  templateUrl: './familycomponent.html',
  styleUrl: './familycomponent.css',
})
export class Familycomponent {
  constructor(public route:ActivatedRoute){}
}
