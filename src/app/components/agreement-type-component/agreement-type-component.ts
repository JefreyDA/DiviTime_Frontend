import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AgreementTypeList } from './agreement-type-list/agreement-type-list';


@Component({
  selector: 'app-agreement-type-component',
  imports: [RouterOutlet, AgreementTypeList],
  templateUrl: './agreement-type-component.html',
  styleUrl: './agreement-type-component.css',
})
export class AgreementTypeComponent {
  constructor(public route: ActivatedRoute) {}
}