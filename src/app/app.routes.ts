import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  {
    path: 'venda/imoveis/:estado/:cidade',
    component: ResultsComponent,
  },
];
