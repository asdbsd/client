import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomValidatorDirective } from './custom-validator.directive';
import { ShortenPipe } from './pipes/shorten.pipe';
import { TimeDiffPipe } from './pipes/time-diff.pipe'; 



@NgModule({
  declarations: [
    CustomValidatorDirective,
    ShortenPipe,
    TimeDiffPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CustomValidatorDirective,
    ShortenPipe,
    TimeDiffPipe
  ]
})
export class SharedModule { }
