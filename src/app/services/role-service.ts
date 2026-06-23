import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ListRole } from '../models/Role';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = `${base_url}/api/roles`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ListRole[]>(`${this.url}/list-roles`);
  }

  listId(id: number) {
    return this.http.get<ListRole>(`${this.url}/${id}`);
  }
}
