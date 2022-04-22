import { Routes, RouterModule } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeComponent } from './theme/theme.component';
import { ThemesComponent } from './themes/themes.component';

const routes: Routes = [
    {
        path: 'add',
        component: NewThemeComponent,
        canActivate: [AuthActivate],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/user/login'
        }
    },
    {
        path: '',
        pathMatch: 'full',
        component: ThemesComponent
    },
    {
        path: ':id',
        component: ThemeComponent
    }
]

export const ThemeRoutingModule = RouterModule.forChild(routes);
