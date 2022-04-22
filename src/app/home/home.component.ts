import { Component } from '@angular/core';
import { ITheme } from '../shared/interfaces';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  themes: ITheme[] | undefined;

  constructor(
    private userService: UserService
  ) {  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
}
