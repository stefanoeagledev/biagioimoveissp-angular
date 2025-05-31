import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Amenidade {
  nome: string;
  iconKey: string;
}

@Component({
  selector: 'app-lista-amenidades',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lista-amenidades">
      <ng-container *ngFor="let item of amenidades">
        <div class="amenidade-item">
          <span class="material-icons">{{ item.iconKey }}</span>
          <span>{{ item.nome }}</span>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./lista-amenidades.component.css'],
})
export class ListaAmenidadesComponent {
  @Input() amenidades: Amenidade[] = [];
}
