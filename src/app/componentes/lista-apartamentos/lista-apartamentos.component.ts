// src/app/componentes/lista-apartamentos/lista-apartamentos.component.ts

import {
  Component,
  OnInit,
  inject,
  effect,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apartamento } from '../../modelos/apartamento.model';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { CardApartamentoComponent } from '../card-apartamento/card-apartamento.component';

interface FaixaNum {
  min: number;
  max: number;
}

@Component({
  selector: 'app-lista-apartamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, CardApartamentoComponent],
  templateUrl: './lista-apartamentos.component.html',
  styleUrls: ['./lista-apartamentos.component.css'],
})
export class ListaApartamentosComponent implements OnInit {
  private serv = inject(ApartamentosServico);

  // Signal que aponta para a lista filtrada de apartamentos
  apartamentos: Signal<Apartamento[]> = this.serv.apartamentosFiltrados;

  // DOMÍNIOS (serão preenchidos dinamicamente)
  areaDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  quartosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  suitesDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  banheirosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  lavabosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  vagasDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  precoDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  // VALORES SELECIONADOS (inicializados depois que o domínio é calculado)
  selArea: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selQuartos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selSuites: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selBanheiros: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selLavabos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selVagas: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selPreco: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  ngOnInit(): void {
    // Efeito que recalcula domínios sempre que todosApartamentos muda
    effect(() => {
      const todos = this.serv.obterTodosApartamentosSignal()();
      // sinal com todos os apartamentos

      if (!todos.length) {
        return;
      }

      // Função para extrair faixa de um array numérico
      const faixaDe = (arr: number[]): FaixaNum => ({
        min: Math.min(...arr),
        max: Math.max(...arr),
      });

      // 1) Domínio de áreas
      const todasAreas = todos.flatMap((a) => a.plantas.map((p) => p.area));
      const faixaArea = faixaDe(todasAreas);
      this.areaDom.set(faixaArea);
      this.selArea.set({ ...faixaArea });

      // 2) Domínio de quartos
      const todosQuartos = todos.flatMap((a) =>
        a.plantas.map((p) => p.quartos)
      );
      const faixaQuartos = faixaDe(todosQuartos);
      this.quartosDom.set(faixaQuartos);
      this.selQuartos.set({ ...faixaQuartos });

      // 3) Domínio de suítes
      const todasSuites = todos.flatMap((a) => a.plantas.map((p) => p.suites));
      const faixaSuites = faixaDe(todasSuites);
      this.suitesDom.set(faixaSuites);
      this.selSuites.set({ ...faixaSuites });

      // 4) Domínio de banheiros
      const todosBanheiros = todos.flatMap((a) =>
        a.plantas.map((p) => p.banheiros)
      );
      const faixaBanheiros = faixaDe(todosBanheiros);
      this.banheirosDom.set(faixaBanheiros);
      this.selBanheiros.set({ ...faixaBanheiros });

      // 5) Domínio de lavabos
      const todosLavabos = todos.flatMap((a) =>
        a.plantas.map((p) => p.lavabos)
      );
      const faixaLavabos = faixaDe(todosLavabos);
      this.lavabosDom.set(faixaLavabos);
      this.selLavabos.set({ ...faixaLavabos });

      // 6) Domínio de vagas
      const todasVagas = todos.flatMap((a) => a.vagas);
      const faixaVagas = faixaDe(todasVagas);
      this.vagasDom.set(faixaVagas);
      this.selVagas.set({ ...faixaVagas });

      // 7) Domínio de preços
      const todosPrecos = todos.flatMap((a) => a.plantas.map((p) => p.preco));
      const faixaPrecos = faixaDe(todosPrecos);
      this.precoDom.set(faixaPrecos);
      this.selPreco.set({ ...faixaPrecos });
    });
  }

  // Métodos para atualizar o serviço e o sinal de seleção

  onBairroChange(texto: string) {
    this.serv.atualizarCampoFiltro('bairro', texto || undefined);
  }

  onAreaMinChange(valor: number) {
    this.selArea.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minArea', valor);
  }
  onAreaMaxChange(valor: number) {
    this.selArea.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxArea', valor);
  }

  onQuartosMinChange(valor: number) {
    this.selQuartos.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minQuartos', valor);
  }
  onQuartosMaxChange(valor: number) {
    this.selQuartos.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxQuartos', valor);
  }

  onSuitesMinChange(valor: number) {
    this.selSuites.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minSuites', valor);
  }
  onSuitesMaxChange(valor: number) {
    this.selSuites.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxSuites', valor);
  }

  onBanheirosMinChange(valor: number) {
    this.selBanheiros.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minBanheiros', valor);
  }
  onBanheirosMaxChange(valor: number) {
    this.selBanheiros.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxBanheiros', valor);
  }

  onLavabosMinChange(valor: number) {
    this.selLavabos.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minLavabos', valor);
  }
  onLavabosMaxChange(valor: number) {
    this.selLavabos.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxLavabos', valor);
  }

  onVagasMinChange(valor: number) {
    this.selVagas.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minVagas', valor);
  }
  onVagasMaxChange(valor: number) {
    this.selVagas.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxVagas', valor);
  }

  onPrecoMinChange(valor: number) {
    this.selPreco.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minPreco', valor);
  }
  onPrecoMaxChange(valor: number) {
    this.selPreco.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxPreco', valor);
  }

  // Limpar todos os filtros e resetar sliders
  onLimparFiltros() {
    this.serv.limparFiltros();
    this.selArea.set({ ...this.areaDom() });
    this.selQuartos.set({ ...this.quartosDom() });
    this.selSuites.set({ ...this.suitesDom() });
    this.selBanheiros.set({ ...this.banheirosDom() });
    this.selLavabos.set({ ...this.lavabosDom() });
    this.selVagas.set({ ...this.vagasDom() });
    this.selPreco.set({ ...this.precoDom() });
  }
}
