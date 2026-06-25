import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chat } from '../../../models/chatModels/Chat';
import { ChatService } from '../../../services/chat-service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.css',
})
export class ChatList implements OnInit{
  listChats: Chat[] = []
  displayedColumns: string[] = ['startDateChat', 'frequencyChat', 'idUser', 'acciones'];

  constructor(
    private cS: ChatService,
    private cdRef: ChangeDetectorRef

  ){}

  ngOnInit(): void {
    this.cargarChats()
  }

  cargarChats(){
    this.cS.list().subscribe({
      next: (data) =>{
        this.listChats = data
        this.cdRef.detectChanges();
      }
    })
  }
}
