import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Agreement } from '../models/Agreement';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  private url = `${base_url}/api/agreement`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Agreement[]>(`${this.url}/listAgreements`);
  }

  insert(a: Agreement) {
    return this.http.post(`${this.url}/insert-agreement`, a);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Agreement>(`${this.url}/${id}`);
  }

  update(a: Agreement) {
    return this.http.put(`${this.url}/update-agreement`, a, { responseType: 'text' });
  }

}