import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChatList } from './chat-list/chat-list';
import { ChatBot } from './chat-bot/chat-bot';

@Component({
  selector: 'app-chatcomponent',
  imports: [RouterOutlet, ChatList, ChatBot],
  templateUrl: './chatcomponent.html',
  styleUrl: './chatcomponent.css',
})
export class Chatcomponent {
  constructor(public route:ActivatedRoute) {}
}
