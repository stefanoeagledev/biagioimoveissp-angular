import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 👈 Add this import
import { slugify } from '../utils/slugify'; // path may vary

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
  filtered: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe((params) => {
      this.estado = (params.get('estado') || '').toUpperCase();
      this.cidade = (params.get('cidade') || '')
        .replace(/-/g, ' ')
        .toLowerCase();
      this.fetchData();
    });
  }

  fetchData() {
    this.http.get<any[]>('/assets/apartamentos.json').subscribe((data) => {
      this.imoveis = data;
      this.filtered = this.imoveis.filter(
        (imovel) =>
          imovel.estado.toUpperCase() === this.estado &&
          imovel.cidade.toLowerCase().replace(/ /g, '-') ===
            this.cidade.replace(/ /g, '-')
      );
      this.loading = false;
    });
  }
}
