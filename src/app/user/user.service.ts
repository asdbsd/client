import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { LocalStorage } from '../core/injection-tokens';
import { IUser } from '../shared/interfaces';

const API_URL = environment.apiURL

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(
    // @Inject(LocalStorage) private localStorage: Window['localStorage'],
    private client: HttpClient
    ) { 

    // try {
    //   const localStorageUser = this.localStorage.getItem('<USER>') || 'ERROR';
    //   this.user = JSON.parse(localStorageUser)
    // } catch {
    //   this.user = undefined
    // }
  }

  login(data: { email: string, password: string }) {
    return this.client.post<IUser>(`${API_URL}/login`, data, {
      withCredentials: true
    }).pipe(
      tap(user => this.user = user)
    )
  }

  register(data: { username: string, email: string, tel: string, password: string }) {
    return this.client.post<IUser>(`${API_URL}/register`, data, {
      withCredentials: true
    }).pipe(
      tap(user => this.user = user)
    )
  }

  getProfileInfo() {
    return this.client.get<IUser>(`${API_URL}/users/profile`, {
      withCredentials: true
    }).pipe(
      tap(user => this.user = user)
    )
  }

  logout() {
    return this.client.post<IUser>(`${API_URL}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => { this.user = null })
    )
  }

  updateProfile(data: { username: string, email: string, tel: string } ) {
    return this.client.put<IUser>(`${API_URL}/users/profile`, data, {
      withCredentials: true
    }).pipe(
      tap((user) => { this.user = user })
    )
  }
}
