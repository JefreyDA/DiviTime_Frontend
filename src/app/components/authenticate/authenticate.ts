import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequestDTO } from '../../models/JwtRequestDTO';

@Component({
  selector: 'app-authenticate',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void { }

  login() {
    let request = new JwtRequestDTO();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        console.log(data);

        sessionStorage.setItem('token', data.jwttoken);

        console.log(sessionStorage.getItem('token'));

        this.router.navigate(['homes']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}


