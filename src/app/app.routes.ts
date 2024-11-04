import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cars',
    children: [
      {
        path: '',
        loadComponent: () => import('./car/car.page').then(m => m.CarPage)
      },
      {
        path: 'new',
        loadComponent: () => import('./car/new-car/new-car.page').then(m => m.NewCarPage)
      }
    ]

  }
];
