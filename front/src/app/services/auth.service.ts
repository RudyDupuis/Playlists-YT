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
      email: user.email,
      password: user.password,
    });
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email: user.email,
      password: user.password,
    });
  }

  setToken(token: string): void {
    this.cookieService.set('authToken', token);
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cookieService.delete('authToken');
  }
}
