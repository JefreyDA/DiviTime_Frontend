import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AgreementList } from './agreement-list/agreement-list';

@Component({
  selector: 'app-agreement-component',
  standalone: true,
  imports: [RouterOutlet, AgreementList],
  templateUrl: './agreement-component.html',
  styleUrl: './agreement-component.css',
})
export class AgreementComponent {

  constructor(public route: ActivatedRoute) {}

}