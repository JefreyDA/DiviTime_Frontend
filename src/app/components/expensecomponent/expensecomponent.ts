import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ExpenseList } from './expense-list/expense-list';

@Component({
  selector: 'app-expensecomponent',
  imports: [RouterOutlet,ExpenseList],
  templateUrl: './expensecomponent.html',
  styleUrl: './expensecomponent.css',
})
export class Expensecomponent {
  constructor(public route:ActivatedRoute){}

}
