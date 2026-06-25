import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Family } from '../models/familyModels/Family';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  private url = `${base_url}/api/family`;

  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<Family[]>(`${this.url}/listFamilies`)
  }
  
  insert(f: Family) {
    return this.http.post(`${this.url}/insert-family`, f);
  } 
  
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  
  listId(id: number) {
    return this.http.get<Family>(`${this.url}/${id}`)
  }
  
  update(f: Family) {
    return this.http.put(`${this.url}/update`, f, { responseType: 'text' })
  }
  
  listByDates(fechaInicio: string, fechaFin: string){
    return this.http.get<Family[]>(`${this.url}/familias-by-dates?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
}
