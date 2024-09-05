import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      pseudo: user.pseudo,
      email: user.email,
      password: user.password,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  setCookie(token: string, pseudo: string): void {
    this.cookieService.set('authToken', token);
    this.cookieService.set('pseudo', pseudo);
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  getPseudo(): string {
    return this.cookieService.get('pseudo');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('pseudo');
  }
}
