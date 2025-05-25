import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'venda/imoveis/:estado/:cidade',
    loadComponent: () =>
      import('./results/results.component').then((m) => m.ResultsComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
