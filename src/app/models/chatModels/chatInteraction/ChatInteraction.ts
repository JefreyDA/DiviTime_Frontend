export interface ChatInteraction {
  idInteraction: number;
  messageText: string;
  senderRole: 'USER' | 'BOT';
  interactionDate: string;
}