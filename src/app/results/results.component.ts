import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { slugify } from '../utils/slugify';
import { ResultsFilterComponent } from '../components/results-filter/results-filter.component';
import { ResultsSortComponent } from '../components/results-sort/results-sort.component';
import { PropertyCardComponent } from '../components/property-card/property-card.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    ResultsFilterComponent,
    ResultsSortComponent,
    PropertyCardComponent,
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  imoveis: any[] = [];
  filtered: any[] = [];
  loading = true;
  displayCidade = '';
  displayEstado = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe((p) => {
      this.displayEstado = p.get('estado') || '';
      this.displayCidade = p.get('cidade') || '';
      this.fetchData();
    });
  }

  fetchData() {
    this.http.get<any[]>('/assets/apartamentos.json').subscribe((data) => {
      this.imoveis = data;
      this.filtered = this.imoveis.filter(
        (i) =>
          slugify(i.estado) === slugify(this.displayEstado) &&
          slugify(i.cidade) === slugify(this.displayCidade)
      );
      if (this.filtered.length) {
        // pull proper display from data
        this.displayEstado = this.filtered[0].estado;
        this.displayCidade = this.filtered[0].cidade;
      }
      this.loading = false;
    });
  }
}
