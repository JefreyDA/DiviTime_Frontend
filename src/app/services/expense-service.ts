import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../models/expenseModels/Expense';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private url = `${base_url}/api/expense`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Expense[]>(`${this.url}/list-expenses`);
  }
  insert(p: Expense) {
    return this.http.post(`${this.url}/register-expense`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id:number){
    return this.http.get<Expense>(`${this.url}/${id}`)
  }

  update(p:Expense){
    return this.http.put(`${this.url}/update-expense`, p,{ responseType: 'text' })
  }
  
}
