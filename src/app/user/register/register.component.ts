import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPhone, faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Subject } from 'rxjs';
import { emailValidator, sameValueAsFactory } from 'src/app/shared/validators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  form!: FormGroup;

  killSubscription = new Subject();

  icons = {
    faPhone,
    faLock,
    faEnvelope,
    faUser
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)], []],
      email: ['', [Validators.required, emailValidator], []],
      password: ['', [Validators.required, Validators.minLength(5)], []],
      tel: ['', [], []],
      repeatPassword: ['', [], []]
    })

    this.form.get('repeatPassword')!.addValidators(sameValueAsFactory(() => this.form?.get('password'), this.killSubscription))
  }

  ngOnDestroy(): void {
    this.killSubscription.next(null);
    this.killSubscription.complete()
  }

  register(): void {
    if (this.form.invalid) { return; }
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
