import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chatModels/Chat';
import { ChatMessageRequest } from '../models/chatModels/chatMessageRequest/ChatMessageRequest';
import { ChatMessageResponse } from '../models/chatModels/chatMessageResponse/ChatMessageResponse';
import { Observable } from 'rxjs';
import { ChatInteraction } from '../models/chatModels/chatInteraction/ChatInteraction';

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

   // Enviar mensaje al bot
  sendMessage(request: ChatMessageRequest): Observable<ChatMessageResponse> {
    return this.http.post<ChatMessageResponse>(`${this.url}/message`, request);
  }

  // Obtener historial de un chat
  getHistory(idChat: number): Observable<ChatInteraction[]> {
    return this.http.get<ChatInteraction[]>(`${this.url}/history/${idChat}`);
  }
}
