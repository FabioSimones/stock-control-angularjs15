import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/interfaces/users/auth/AuthResponse';
import { AuthRequest } from 'src/app/models/interfaces/users/auth/AuthResquest';
import { SignUpUserRequest } from 'src/app/models/interfaces/users/SignUpUserRequest';
import { SignUpUserResponse } from 'src/app/models/interfaces/users/SignUpUserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL

  constructor( private http: HttpClient) { }

  signUpUser(requestDatas: SignUpUserRequest): Observable<SignUpUserResponse>{
    return this.http.post<SignUpUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`, requestDatas
    )
  }
}
