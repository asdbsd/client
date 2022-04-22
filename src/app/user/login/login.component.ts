import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { emailValidator } from 'src/app/shared/validators';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  faEnvelope = faEnvelope;
  faLock = faLock;

  emailValidator = emailValidator

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  login(form: NgForm) {
    if (form.invalid) { return; }
    const { email, password } = form.value
    this.userService.login({ email, password }).subscribe({
      next: () => {
        const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
        this.router.navigate([redirectUrl])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
