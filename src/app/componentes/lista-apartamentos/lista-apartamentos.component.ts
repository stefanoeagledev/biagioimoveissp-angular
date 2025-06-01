// src/app/componentes/lista-apartamentos/lista-apartamentos.component.ts

import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Apartamento } from '../../modelos/apartamento.model';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { CardApartamentoComponent } from '../card-apartamento/card-apartamento.component';

@Component({
  selector: 'app-lista-apartamentos',
  standalone: true,
  imports: [CommonModule, CardApartamentoComponent],
  templateUrl: './lista-apartamentos.component.html',
  styleUrls: ['./lista-apartamentos.component.css'],
})
export class ListaApartamentosComponent {
  private serv = inject(ApartamentosServico);

  /** sinal com a lista de apartamentos já filtrada */
  apartamentos: Signal<Apartamento[]> = this.serv.apartamentosFiltrados;
}
