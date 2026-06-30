import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AgreementType } from '../models/agreement-type';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AgreementTypeService {

  private url = `${base_url}/api/agreementType`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<AgreementType[]>(`${this.url}/list-agreementType`);
  }

  insert(a: AgreementType) {
    return this.http.post(`${this.url}/register-agreementType`, a);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<AgreementType>(`${this.url}/${id}`);
  }

  update(a: AgreementType) {
    return this.http.put(`${this.url}/update-agreementType`, a, { responseType: 'text' });
  }
}