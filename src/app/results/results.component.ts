import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { slugify } from '../utils/slugify';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  imoveis: any[] = [];
  loading = true;
  estado = '';
  cidade = '';
  displayCidade = '';
  displayEstado = '';
  filtered: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe((params) => {
      this.estado = params.get('estado') || '';
      this.cidade = params.get('cidade') || '';
      this.fetchData();
    });
  }

  fetchData() {
    this.http.get<any[]>('/assets/apartamentos.json').subscribe((data) => {
      this.imoveis = data;
      this.filtered = this.imoveis.filter(
        (imovel) =>
          slugify(imovel.estado) === slugify(this.estado) &&
          slugify(imovel.cidade) === slugify(this.cidade)
      );
      // Set display values if found
      if (this.filtered.length > 0) {
        this.displayCidade = this.filtered[0].cidade;
        this.displayEstado = this.filtered[0].estado;
      } else {
        // fallback to route params or empty
        this.displayCidade = '';
        this.displayEstado = '';
      }
      this.loading = false;
    });
  }
}
