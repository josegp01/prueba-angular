import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard, dashboardGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path:'',
    component: AppComponent,
    children:[
      {
        path: '',
        component: LoginComponent,
        canActivate:[authGuard],
      },
      {
        path: 'dashboard',
        canActivate: [dashboardGuard],
        component: DashboardComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];
