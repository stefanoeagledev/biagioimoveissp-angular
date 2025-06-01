import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Apartamento, Planta } from '../../modelos/apartamento.model';

@Component({
  selector: 'app-card-apartamento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card card-apartamento">
      <img
        class="card-img-top"
        [src]="'/assets/' + a.fotos[0]"
        alt="Foto do {{ a.nome }}"
      />
      <div class="card-body">
        <h2 class="card-title">{{ a.nome }}</h2>
        <p class="card-local">{{ a.bairro }}, {{ a.cidade }}</p>

        <div class="card-detalhes-icons">
          <!-- Ícone de metragem + área -->
          <span class="icon texto-det">
            <span class="material-icons">square_foot</span>
            {{ areaFormatada() }}
          </span>

          <!-- Ícone de quartos -->
          <span class="icon texto-det">
            <span class="material-icons">king_bed</span>
            {{ quartosFormatados() }}
          </span>

          <!-- Ícone de banheiros -->
          <span class="icon texto-det">
            <span class="material-icons">bathtub</span>
            {{ banheirosFormatados() }}
          </span>

          <!-- Ícone de vagas -->
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
    const lista = this.a.plantas.map((p: Planta) => `${p.area} m²`);
    return this.formatarLista(lista, 'e');
  }

  quartosFormatados(): string {
    const lista = this.a.plantas.map((p: Planta) => p.quartos.toString());
    return this.formatarLista(lista, 'e');
  }

  banheirosFormatados(): string {
    const lista = this.a.plantas.map((p: Planta) => p.banheiros.toString());
    return this.formatarLista(lista, 'e');
  }

  vagasFormatadas(): string {
    const únicos = Array.from(new Set(this.a.vagas.map((v) => v.toString())));
    return this.formatarLista(únicos, 'ou');
  }

  formatarLista(items: string[], conj: 'e' | 'ou'): string {
    const únicos = Array.from(new Set(items));
    if (únicos.length === 0) return '';
    if (únicos.length === 1) return únicos[0];
    if (únicos.length === 2) return `${únicos[0]} ${conj} ${únicos[1]}`;

    const todosMenosUltimo = únicos.slice(0, -1).join(', ');
    const último = únicos[únicos.length - 1];
    return `${todosMenosUltimo} ${conj} ${último}`;
  }
}
