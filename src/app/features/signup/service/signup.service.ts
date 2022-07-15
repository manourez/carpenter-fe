import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser, User } from '../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: CreateUser) {
    return this.http
      .post<User>(`${this.baseUrl}/auth/register`, user)
      .pipe(tap(() => this.router.navigate(['/login'])));
  }
}
