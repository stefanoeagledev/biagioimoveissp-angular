// src/app/componentes/lista-apartamentos/lista-apartamentos.component.ts

import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← importe aqui
import { Apartamento } from '../../modelos/apartamento.model';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { CardApartamentoComponent } from '../card-apartamento/card-apartamento.component';

@Component({
  selector: 'app-lista-apartamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, CardApartamentoComponent], // ← adicione FormsModule
  templateUrl: './lista-apartamentos.component.html',
  styleUrls: ['./lista-apartamentos.component.css'],
})
export class ListaApartamentosComponent implements OnInit {
  private serv = inject(ApartamentosServico);

  apartamentos: Signal<Apartamento[]> = this.serv.apartamentosFiltrados;

  // DOMÍNIOS
  areaDom = { min: 0, max: 200 };
  quartosDom = { min: 0, max: 5 };
  suitesDom = { min: 0, max: 3 };
  banheirosDom = { min: 0, max: 4 };
  lavabosDom = { min: 0, max: 2 };
  vagasDom = { min: 0, max: 3 };
  precoDom = { min: 0, max: 2000000 };

  // VALORES SELECIONADOS
  selArea = { min: this.areaDom.min, max: this.areaDom.max };
  selQuartos = { min: this.quartosDom.min, max: this.quartosDom.max };
  selSuites = { min: this.suitesDom.min, max: this.suitesDom.max };
  selBanheiros = { min: this.banheirosDom.min, max: this.banheirosDom.max };
  selLavabos = { min: this.lavabosDom.min, max: this.lavabosDom.max };
  selVagas = { min: this.vagasDom.min, max: this.vagasDom.max };
  selPreco = { min: this.precoDom.min, max: this.precoDom.max };

  ngOnInit(): void {
    // nada extra aqui
  }

  onBairroChange(texto: string) {
    this.serv.atualizarCampoFiltro('bairro', texto || undefined);
  }

  onAreaMinChange(valor: number) {
    this.selArea.min = valor;
    this.serv.atualizarCampoFiltro('minArea', valor);
  }
  onAreaMaxChange(valor: number) {
    this.selArea.max = valor;
    this.serv.atualizarCampoFiltro('maxArea', valor);
  }

  onQuartosMinChange(valor: number) {
    this.selQuartos.min = valor;
    this.serv.atualizarCampoFiltro('minQuartos', valor);
  }
  onQuartosMaxChange(valor: number) {
    this.selQuartos.max = valor;
    this.serv.atualizarCampoFiltro('maxQuartos', valor);
  }

  onSuitesMinChange(valor: number) {
    this.selSuites.min = valor;
    this.serv.atualizarCampoFiltro('minSuites', valor);
  }
  onSuitesMaxChange(valor: number) {
    this.selSuites.max = valor;
    this.serv.atualizarCampoFiltro('maxSuites', valor);
  }

  onBanheirosMinChange(valor: number) {
    this.selBanheiros.min = valor;
    this.serv.atualizarCampoFiltro('minBanheiros', valor);
  }
  onBanheirosMaxChange(valor: number) {
    this.selBanheiros.max = valor;
    this.serv.atualizarCampoFiltro('maxBanheiros', valor);
  }

  onLavabosMinChange(valor: number) {
    this.selLavabos.min = valor;
    this.serv.atualizarCampoFiltro('minLavabos', valor);
  }
  onLavabosMaxChange(valor: number) {
    this.selLavabos.max = valor;
    this.serv.atualizarCampoFiltro('maxLavabos', valor);
  }

  onVagasMinChange(valor: number) {
    this.selVagas.min = valor;
    this.serv.atualizarCampoFiltro('minVagas', valor);
  }
  onVagasMaxChange(valor: number) {
    this.selVagas.max = valor;
    this.serv.atualizarCampoFiltro('maxVagas', valor);
  }

  onPrecoMinChange(valor: number) {
    this.selPreco.min = valor;
    this.serv.atualizarCampoFiltro('minPreco', valor);
  }
  onPrecoMaxChange(valor: number) {
    this.selPreco.max = valor;
    this.serv.atualizarCampoFiltro('maxPreco', valor);
  }

  onLimparFiltros() {
    this.serv.limparFiltros();
    this.selArea = { ...this.areaDom };
    this.selQuartos = { ...this.quartosDom };
    this.selSuites = { ...this.suitesDom };
    this.selBanheiros = { ...this.banheirosDom };
    this.selLavabos = { ...this.lavabosDom };
    this.selVagas = { ...this.vagasDom };
    this.selPreco = { ...this.precoDom };
  }
}
