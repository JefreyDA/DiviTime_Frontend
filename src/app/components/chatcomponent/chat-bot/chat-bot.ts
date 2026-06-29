import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../../services/chat-service';
import { ChatInteraction } from '../../../models/chatModels/chatInteraction/ChatInteraction';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TextFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './chat-bot.html',
  styleUrl: './chat-bot.css',
})
export class ChatBot implements OnInit {
  @ViewChild('messagesContainer', { static: false })
  private messagesContainer!: ElementRef;

  idChat: number = 0;
  messages: ChatInteraction[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  errorMsg: string = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('idChat');
    this.idChat = param ? Number(param) : 0;

    if (this.idChat > 0) {
      this.loadHistory();
    }
  }

  loadHistory(): void {
    this.chatService.getHistory(this.idChat).subscribe({
      next: (history) => {
        this.messages = history;
        this.cdRef.detectChanges();
        this.scrollToBottom(); // ← agregar
      },
      error: () => { this.errorMsg = 'No se pudo cargar el historial.'; },
    });
  }
  sendMessage(): void {
    const text = this.newMessage.trim();
    if (!text || this.isLoading) return;

    const userMsg: ChatInteraction = {
      idInteraction: Date.now(),
      messageText: text,
      senderRole: 'USER',
      interactionDate: new Date().toISOString(),
    };
    this.messages.push(userMsg);
    this.newMessage = '';
    this.isLoading = true;
    this.errorMsg = '';

    this.chatService.sendMessage({ idChat: this.idChat, message: text }).subscribe({
      next: (response) => {
        this.messages.push({
          idInteraction: Date.now() + 1,
          messageText: response.botResponse,
          senderRole: 'BOT',
          interactionDate: response.timestamp,
        });
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.scrollToBottom();
      },
      error: () => {
        this.errorMsg = 'Hubo un problema al conectar con el asistente. Intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        if (this.messagesContainer) {
          this.messagesContainer.nativeElement.scrollTop =
            this.messagesContainer.nativeElement.scrollHeight;
        }
      } catch { }
    }, 50);   
  }
}