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
  templateUrl: './lista-amenidades.component.html',
  styleUrls: ['./lista-amenidades.component.css'],
})
export class ListaAmenidadesComponent {
  @Input() amenidades: Amenidade[] = [];
}
