// src/app/componentes/detalhes-planta/detalhes-planta.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planta } from '../../modelos/apartamento.model';

@Component({
  selector: 'app-detalhes-planta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="detalhes-planta">
      <img [src]="'/assets/' + planta.foto" alt="Planta {{ planta.area }} m²" />
      <ul>
        <li><strong>Área:</strong> {{ planta.area }} m²</li>
        <li><strong>Preço a partir de:</strong> {{ planta.precoapartirde }}</li>
        <li><strong>Quartos:</strong> {{ planta.quartos }}</li>
        <li><strong>Banheiros:</strong> {{ planta.banheiros }}</li>
        <li *ngIf="planta.lavabos > 0">
          <strong>Lavabos:</strong> {{ planta.lavabos }}
        </li>
        <li *ngIf="planta.tabelaem">
          <strong>Condição:</strong> {{ planta.tabelaem }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./detalhes-planta.component.css'],
})
export class DetalhesPlantaComponent {
  @Input() planta!: Planta;
}
