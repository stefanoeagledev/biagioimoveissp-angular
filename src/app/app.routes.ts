import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component'; // adjust path if needed

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
  },
  {
    path: 'venda/imoveis/:estado/:cidade',
    loadComponent: () =>
      import('./results/results.component').then((m) => m.ResultsComponent),
  },
  // Optional: add a wildcard to handle not found
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
