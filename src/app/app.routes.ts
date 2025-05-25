import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  // ...other routes,
  {
    path: 'venda/imoveis/:estado/:cidade',
    component: ResultsComponent,
  },
];
