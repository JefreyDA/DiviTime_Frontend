import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chatModels/Chat';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = `${base_url}/api/chat`

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Chat[]>(`${this.url}/list-all-chats`)
  }

  insert(c: Chat) {
    return this.http.post(`${this.url}/register`, c)
  }
}
