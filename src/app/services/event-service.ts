import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/eventModels/Event';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Eventservice {
  private url = `${base_url}/api/event`;

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Event[]>(`${this.url}/list-events`)
  }

  insert(e: Event) {
    return this.http.post(`${this.url}/register-events`, e);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Event>(`${this.url}/${id}`)
  }

  update(e: Event) {
    return this.http.put(`${this.url}/update-event`, e, { responseType: 'text' })
  }
}
