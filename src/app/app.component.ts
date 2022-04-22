import { Component } from '@angular/core';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get isAuthenticating(): boolean {
    return this.userService.user === undefined;
  }

  constructor(
    private userService: UserService
  ) { 
    this.userService.getProfileInfo().subscribe({
      error: () => {
        userService.user = null;
      }
    })
  }



}
