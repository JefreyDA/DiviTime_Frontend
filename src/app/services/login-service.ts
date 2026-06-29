import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtRequestDTO } from '../models/JwtRequestDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  login(request: JwtRequestDTO) {
    return this.http.post('http://localhost:8080/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) return null;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    console.log(decodedToken);
    return decodedToken?.roles || null;
  }

  
}
