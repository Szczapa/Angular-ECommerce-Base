import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../utils/user.type";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/register', user).pipe(
      catchError(error => {
        alert(error.message);
        console.log(error)
        return of();

      })
    )
  }

  login(cred: Pick<User, 'email' | 'password'>): Observable<{accessToken: string}> {
    console.log(cred)
    return this.http.post<{accessToken: string}>(this.apiUrl + '/login', cred).pipe(
      tap(res => localStorage.setItem('token', res.accessToken)),
      catchError(error => {
        console.log(error, "ça morche po")
        return of()
      })

    )
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }


}
