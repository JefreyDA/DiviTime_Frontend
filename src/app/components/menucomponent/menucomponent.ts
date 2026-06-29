import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule,RouterLink],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {

  role: string = '';
  usuario: string = '';

  constructor(private loginService: LoginService,private router: Router) { }

  cerrar() {
    sessionStorage.clear();
    this.role = '';
  this.router.navigate(['/login']);
  }


  verificar() {
    this.role = this.loginService.showRole();

    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isHijo() {
    return this.role === 'HIJO';
  }

  isPadre() {
    return this.role === 'PADRE DE FAMILIA';
  }

  isTutor() {
    return this.role === 'TUTOR LEGAL';
  }

   // o el bot si tienes ruta directa
}




