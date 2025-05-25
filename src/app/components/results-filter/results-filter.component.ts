import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter-row">
      <button class="pill-btn">
        <span class="material-icons">filter_list</span>
        Filtrar <span class="pill-count">{{ filterCount }}</span>
      </button>
      <button class="pill-btn">
        <span class="material-icons">notifications_active</span>
        Criar alerta
      </button>
      <div class="pill-dropdown">
        Valor <span class="material-icons">arrow_drop_down</span>
      </div>
      <div class="pill-dropdown">
        Cômodos <span class="material-icons">arrow_drop_down</span>
      </div>
      <div class="pill-dropdown">
        Bairros <span class="material-icons">arrow_drop_down</span>
      </div>
      <button class="pill-btn map-btn">
        <span class="material-icons">map</span> Ver mapa
      </button>
    </div>
  `,
  styleUrls: ['./results-filter.component.css'],
})
export class ResultsFilterComponent {
  @Input() filterCount = 0;
}
