import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { InsertingUsers } from '../models/userModels/User';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${base_url}/api/users`;

  constructor(private http: HttpClient) { }

  insert(u: InsertingUsers) {
    return this.http.post(`${this.url}/register-users`, u);
  }

  list() {
    return this.http.get<InsertingUsers[]>(`${this.url}/list-users`);
  }

  listAll() {
    return this.http.get<InsertingUsers[]>(`${this.url}/list-all-users`);
  }

  listActiveUsers() {
    return this.http.get<InsertingUsers[]>(`${this.url}/list-active-users`);
  }

  listInactiveUsers() {
    return this.http.get<InsertingUsers[]>(`${this.url}/list-inactive-users`);
  }

  deleteByEmail(emailUser: string) {
    return this.http.delete(`${this.url}/delete-by-email/${encodeURIComponent(emailUser)}`, {
      responseType: `text`
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: `text` });
  }

  //Método para obtener a un usuario mediante su ID
  getById(id: number) {
    return this.http.get<InsertingUsers>(`${this.url}/list-user-by-id/${id}`)
  }

  getByEmail(email: string) {
    return this.http.get<InsertingUsers>(`${this.url}/list-by-email/${email}`);
  }
}
