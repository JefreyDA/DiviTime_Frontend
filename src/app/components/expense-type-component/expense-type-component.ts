import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ExpenseTypeList } from './expense-type-list/expense-type-list';

@Component({
  selector: 'app-expense-type-component',
  imports: [RouterOutlet,ExpenseTypeList],
  templateUrl: './expense-type-component.html',
  styleUrl: './expense-type-component.css',
})
export class ExpenseTypeComponent {
  constructor(public route:ActivatedRoute){}

}
  