import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

// import { LocalStorage } from '../core/injection-tokens';
import { IUser } from '../shared/interfaces';


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
    return this.client.post<IUser>(`/api/login`, data).pipe(
      tap(user => this.user = user)
    )
  }

  register(data: { username: string, email: string, tel: string, password: string }) {
    return this.client.post<IUser>(`/api/register`, data)
      .pipe(
        tap(user => this.user = user)
      )
  }

  getProfileInfo() {
    return this.client.get<IUser>('/api/users/profile')
      .pipe(
        tap(user => {
          this.user = user
        })
      )
  }

  logout() {
    return this.client.post<IUser>(`/api/logout`, {})
      .pipe(
        tap(() => { this.user = null })
      )
  }

  updateProfile(data: { username: string, email: string, tel: string }) {
    return this.client.put<IUser>(`/api/profile`, data)
      .pipe(
        tap((user) => { this.user = user })
      )
  }
}
