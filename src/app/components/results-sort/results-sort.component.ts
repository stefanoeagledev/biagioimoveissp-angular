import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sort-row">
      <label for="sort">Ordenar por:</label>
      <select id="sort" [(ngModel)]="sortOption">
        <option>Mais relevante</option>
        <option>Menor preço</option>
        <option>Maior preço</option>
      </select>
    </div>
  `,
  styleUrls: ['./results-sort.component.css'],
})
export class ResultsSortComponent {
  sortOption = 'Mais relevante';
}
