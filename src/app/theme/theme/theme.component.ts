import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/core/content.service';
import { ITheme } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {
  theme: ITheme | undefined;

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
    ) {
    this.fetchTheme();
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  fetchTheme(): void {
    this.theme = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.contentService.loadTheme(id).subscribe(theme => {
      this.theme = theme 
    })
  }


}
