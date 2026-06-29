import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chat } from '../../../models/chatModels/Chat';
import { ChatService } from '../../../services/chat-service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-chat-insert',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './chat-insert.html',
  styleUrl: './chat-insert.css',
})
export class ChatInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  ch: Chat = new Chat()

  constructor(
    private cS: ChatService,
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      frequencyChat: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      idUser: ['', Validators.required] //Necesito crear una input para ingresar el id del usuario, ya que aún no tengo login
    })
  }

  registrarChat(): void {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, complete el formulario correctamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const idUsuarioLogueado = this.form.value.idUser;

    this.uS.getById(idUsuarioLogueado).subscribe({
      next: (user) => {
        this.ch.frequencyChat = this.form.value.frequencyChat;
        this.ch.startDateChat = new Date();
        this.ch.idUser = idUsuarioLogueado;

        this.cS.insert(this.ch).subscribe({
          next: () => {
            this.snackBar.open('Chat emocional registrado con éxito', 'Cerrar', { duration: 3000 });
            this.form.reset();
            this.router.navigate(['/chats']);
          },
          error: () => {
            this.snackBar.open('Error al registrar el chat.', 'Cerrar', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Usuario no encontrado.', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
