import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  get isLoged(): boolean {
    return this.userService.isLogged;
  }

  get firstName(): string {
    return this.userService.user?.username || 'Guest';
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
    
  }
}
