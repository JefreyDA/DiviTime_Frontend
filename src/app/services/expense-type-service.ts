import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ExpenseType } from '../models/ExpenseType';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ExpenseTypeService {
  private url = `${base_url}/api/expenseType`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ExpenseType[]>(`${this.url}/list-expense-types`);
  }
  insert(p: ExpenseType) {
    return this.http.post(`${this.url}/register-expense-type`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id:number){
    return this.http.get<ExpenseType>(`${this.url}/${id}`)
  }

  update(p:ExpenseType){
    return this.http.put(`${this.url}/update-expense-type`, p,{ responseType: 'text' })
  }
  
}
