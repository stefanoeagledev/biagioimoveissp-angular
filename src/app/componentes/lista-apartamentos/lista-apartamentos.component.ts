// src/app/componentes/lista-apartamentos/lista-apartamentos.component.ts
import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { Apartamento } from '../../modelos/apartamento.model';
import { CardApartamentoComponent } from '../card-apartamento/card-apartamento.component';

@Component({
  selector: 'app-lista-apartamentos',
  standalone: true,
  imports: [CommonModule, CardApartamentoComponent],
  template: `
    <div class="caixa-filtros">
      <input
        type="text"
        placeholder="Filtrar por bairro"
        (input)="filtrarPorBairro($any($event.target).value)"
      />

      <input
        type="number"
        placeholder="Área mínima (m²)"
        (input)="filtrarPorMinArea($any($event.target).valueAsNumber)"
      />

      <input
        type="number"
        placeholder="Preço mínimo (R$)"
        (input)="filtrarPorMinPreco($any($event.target).valueAsNumber)"
      />

      <input
        type="number"
        placeholder="Preço máximo (R$)"
        (input)="filtrarPorMaxPreco($any($event.target).valueAsNumber)"
      />

      <!-- NOVOS INPUTS PARA LAVABOS -->
      <input
        type="number"
        placeholder="Lavabos mínimos"
        (input)="filtrarPorMinLavabos($any($event.target).valueAsNumber)"
      />

      <input
        type="number"
        placeholder="Lavabos máximos"
        (input)="filtrarPorMaxLavabos($any($event.target).valueAsNumber)"
      />

      <button (click)="limparTodosFiltros()">Limpar filtros</button>
    </div>

    <div class="lista-cards">
      <ng-container *ngFor="let a of apartamentosFiltrados()">
        <app-card-apartamento [a]="a"></app-card-apartamento>
      </ng-container>
    </div>
  `,
  styleUrls: ['./lista-apartamentos.component.css'],
})
export class ListaApartamentosComponent implements OnInit {
  private apartamentosServico = inject(ApartamentosServico);

  /** Sinal que recebe a lista filtrada do serviço */
  apartamentosFiltrados!: Signal<Apartamento[]>;

  ngOnInit(): void {
    // “Inscreve” no computed do serviço
    this.apartamentosFiltrados =
      this.apartamentosServico.obterApartamentosFiltradosSignal();
  }

  filtrarPorBairro(texto: string) {
    this.apartamentosServico.atualizarCampoFiltro('bairro', texto);
  }

  filtrarPorMinArea(valor: number) {
    this.apartamentosServico.atualizarCampoFiltro(
      'minArea',
      isNaN(valor) ? undefined : valor
    );
  }

  filtrarPorMinPreco(valor: number) {
    this.apartamentosServico.atualizarCampoFiltro(
      'minPreco',
      isNaN(valor) ? undefined : valor
    );
  }

  filtrarPorMaxPreco(valor: number) {
    this.apartamentosServico.atualizarCampoFiltro(
      'maxPreco',
      isNaN(valor) ? undefined : valor
    );
  }

  /** NOVO: filtro por lavabos mínimos */
  filtrarPorMinLavabos(valor: number) {
    this.apartamentosServico.atualizarCampoFiltro(
      'minLavabos',
      isNaN(valor) ? undefined : valor
    );
  }

  /** NOVO: filtro por lavabos máximos */
  filtrarPorMaxLavabos(valor: number) {
    this.apartamentosServico.atualizarCampoFiltro(
      'maxLavabos',
      isNaN(valor) ? undefined : valor
    );
  }

  limparTodosFiltros() {
    this.apartamentosServico.limparFiltros();
  }
}
