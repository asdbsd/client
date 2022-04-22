import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  error!: Record<string, string>;

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(({ msg, code, url }) => {
      this.error = { msg, code, url}
    })
   }


}
