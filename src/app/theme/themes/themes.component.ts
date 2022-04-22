import { Component } from '@angular/core';
import { ContentService } from 'src/app/core/content.service';
import { UserService } from 'src/app/core/user.service';
import { IPost, ITheme } from 'src/app/shared/interfaces'; 

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent {
  themes: ITheme[] | undefined;
  recentPosts: IPost[] | undefined;

  constructor(private contentService: ContentService, private userService: UserService) {
    this.fetchThemes();
    this.fetchRecentPosts();
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  fetchThemes(): void {
    this.themes = undefined;
    this.contentService.loadThemes().subscribe(themes => { this.themes = themes; });
    
  }

  fetchRecentPosts(): void {
    this.recentPosts = undefined;
    this.contentService.loadPosts(5).subscribe(posts => {this.recentPosts = posts });
  }

}
