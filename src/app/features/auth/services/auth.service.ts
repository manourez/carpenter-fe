import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateUser, User } from '../../signup/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signUp(user: CreateUser) {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, user);
  }
}
