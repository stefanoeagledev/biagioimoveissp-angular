import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <<< importe o RouterModule
import { Apartamento, Planta } from '../../modelos/apartamento.model';

@Component({
  selector: 'app-card-apartamento',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // <<< inclua aqui
  ],
  template: `
    <div class="card card-apartamento">
      <img
        class="card-img-top"
        [src]="'/assets/' + a.fotos[0]"
        alt="Foto do {{ a.nome }}"
      />
      <div class="card-body">
        <h2 class="card-title">{{ a.nome }}</h2>
        <p class="card-area">{{ areaFormatada() }}</p>
        <p class="card-local">{{ a.bairro }}, {{ a.cidade }}</p>
        <div class="card-detalhes-icons">
          <span class="icon texto-det">
            <span class="material-icons">king_bed</span>
            {{ quartosFormatados() }}
          </span>
          <span class="icon texto-det">
            <span class="material-icons">bathtub</span>
            {{ banheirosFormatados() }}
          </span>
          <span class="icon texto-det">
            <span class="material-icons">garage</span>
            {{ vagasFormatadas() }}
          </span>
        </div>
        <a
          [routerLink]="['/imovel', a.id]"
          class="btn btn-primary btn-ver-detalhes"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./card-apartamento.component.css'],
})
export class CardApartamentoComponent {
  @Input() a!: Apartamento;

  areaFormatada(): string {
    return this.a.plantas.map((p: Planta) => `${p.area} m²`).join(', ');
  }

  quartosFormatados(): string {
    return this.a.plantas.map((p: Planta) => `${p.quartos}`).join(',');
  }

  banheirosFormatados(): string {
    return this.a.plantas.map((p: Planta) => `${p.banheiros}`).join(',');
  }

  vagasFormatadas(): string {
    return this.a.vagas.join(',');
  }
}
