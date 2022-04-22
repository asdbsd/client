import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  inUpdateMode: boolean = false;

  emailValidator = emailValidator;

  constructor(
    private userService: UserService,
  ) { }

  get user() {
    return this.userService.user;
  }

  updateProfile(form: NgForm) {
    if(form.invalid) { return };
    this.userService.updateProfile(form.value).subscribe({
      next: (user) => {
        this.inUpdateMode = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
