// src/app/componentes/filtro-apartamentos/filtro-apartamentos.component.ts

import {
  Component,
  inject,
  effect,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ApartamentosServico,
  Amenidade,
} from '../../servicos/apartamentos.servico';
import { FiltroApartamentos } from '../../servicos/filtro-apartamentos.model';

interface FaixaNum {
  min: number;
  max: number;
}

@Component({
  selector: 'app-filtro-apartamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-apartamentos.component.html',
  styleUrls: ['./filtro-apartamentos.component.css'],
})
export class FiltroApartamentosComponent {
  private serv = inject(ApartamentosServico);

  /** sinal com o objeto de filtro atual */
  filtroAtual: Signal<FiltroApartamentos> = this.serv.obterFiltroSignal();

  /** lista de bairros (para autocomplete) */
  bairrosDisponiveis: Signal<string[]> = this.serv.bairrosDisponiveis;

  /** lista completa de amenidades (iconKey + nome) */
  amenidadesDisponiveis: Signal<Amenidade[]> = this.serv.amenidadesDisponiveis;

  // ——— Domínios (mín e máx) para cada campo numérico ———
  areaDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  quartosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  suitesDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  banheirosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  lavabosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  vagasDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  precoDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  // ——— Valores selecionados atualmente (faixa) ———
  selArea: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selQuartos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selSuites: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selBanheiros: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selLavabos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selVagas: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selPreco: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  /** controla se o dropdown “Valor” (preço) está aberto */
  openPreco: WritableSignal<boolean> = signal(false);

  constructor() {
    // Toda vez que a lista completa de apartamentos mudar, recalculamos os domínios
    effect(() => {
      const todos = this.serv.obterTodosApartamentosSignal()();

      if (!todos.length) {
        return;
      }

      const faixaDe = (arr: number[]): FaixaNum => ({
        min: Math.min(...arr),
        max: Math.max(...arr),
      });

      // 1) DOMÍNIO DE ÁREAS
      const todasAreas = todos.flatMap((a) => a.plantas.map((p) => p.area));
      const fArea = faixaDe(todasAreas);
      this.areaDom.set(fArea);
      this.selArea.set({ ...fArea });

      // 2) DOMÍNIO DE QUARTOS
      const todosQuartos = todos.flatMap((a) =>
        a.plantas.map((p) => p.quartos)
      );
      const fQuartos = faixaDe(todosQuartos);
      this.quartosDom.set(fQuartos);
      this.selQuartos.set({ ...fQuartos });

      // 3) DOMÍNIO DE SUÍTES
      const todasSuites = todos.flatMap((a) => a.plantas.map((p) => p.suites));
      const fSuites = faixaDe(todasSuites);
      this.suitesDom.set(fSuites);
      this.selSuites.set({ ...fSuites });

      // 4) DOMÍNIO DE BANHEIROS
      const todosBanheiros = todos.flatMap((a) =>
        a.plantas.map((p) => p.banheiros)
      );
      const fBanheiros = faixaDe(todosBanheiros);
      this.banheirosDom.set(fBanheiros);
      this.selBanheiros.set({ ...fBanheiros });

      // 5) DOMÍNIO DE LAVABOS
      const todosLavabos = todos.flatMap((a) =>
        a.plantas.map((p) => p.lavabos)
      );
      const fLavabos = faixaDe(todosLavabos);
      this.lavabosDom.set(fLavabos);
      this.selLavabos.set({ ...fLavabos });

      // 6) DOMÍNIO DE VAGAS
      const todasVagas = todos.flatMap((a) => a.vagas.map((v) => v));
      const fVagas = faixaDe(todasVagas);
      this.vagasDom.set(fVagas);
      this.selVagas.set({ ...fVagas });

      // 7) DOMÍNIO DE PREÇOS
      const todosPrecos = todos.flatMap((a) => a.plantas.map((p) => p.preco));
      const fPrecos = faixaDe(todosPrecos);
      this.precoDom.set(fPrecos);
      this.selPreco.set({ ...fPrecos });
    });
  }

  // ——— Métodos chamados a partir da template ———

  /** Atualiza filtro “bairro” */
  onBairroChange(texto: string) {
    this.serv.atualizarCampoFiltro('bairro', texto || undefined);
  }

  /** Atualiza ordem de sort (sortOrder) */
  onSortChange(valor: string) {
    this.serv.atualizarCampoFiltro('sortOrder', valor || undefined);
  }

  /** Atualiza faixa min/max de área */
  onAreaMinChange(valor: number) {
    this.selArea.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minArea', valor);
  }
  onAreaMaxChange(valor: number) {
    this.selArea.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxArea', valor);
  }

  /** Atualiza faixa min/max de quartos */
  onQuartosMinChange(valor: number) {
    this.selQuartos.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minQuartos', valor);
  }
  onQuartosMaxChange(valor: number) {
    this.selQuartos.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxQuartos', valor);
  }

  /** Atualiza faixa min/max de suítes */
  onSuitesMinChange(valor: number) {
    this.selSuites.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minSuites', valor);
  }
  onSuitesMaxChange(valor: number) {
    this.selSuites.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxSuites', valor);
  }

  /** Atualiza faixa min/max de banheiros */
  onBanheirosMinChange(valor: number) {
    this.selBanheiros.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minBanheiros', valor);
  }
  onBanheirosMaxChange(valor: number) {
    this.selBanheiros.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxBanheiros', valor);
  }

  /** Atualiza faixa min/max de lavabos */
  onLavabosMinChange(valor: number) {
    this.selLavabos.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minLavabos', valor);
  }
  onLavabosMaxChange(valor: number) {
    this.selLavabos.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxLavabos', valor);
  }

  /** Atualiza faixa min/max de vagas */
  onVagasMinChange(valor: number) {
    this.selVagas.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minVagas', valor);
  }
  onVagasMaxChange(valor: number) {
    this.selVagas.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxVagas', valor);
  }

  /** Alterna a abertura/fechamento do dropdown “Valor” */
  toggleValorDropdown() {
    this.openPreco.update((v) => !v);
  }

  /** Atualiza preço mínimo */
  onPrecoMinChange(valor: number) {
    this.selPreco.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minPreco', valor);
  }

  /** Atualiza preço máximo */
  onPrecoMaxChange(valor: number) {
    this.selPreco.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxPreco', valor);
  }

  /** Marca ou desmarca uma amenidade no filtro (checkbox) */
  onAmenidadeToggle(iconKey: string, checked: boolean) {
    const atual = this.filtroAtual().amenidades || [];
    const novo = checked
      ? [...atual, iconKey]
      : atual.filter((k) => k !== iconKey);
    this.serv.atualizarCampoFiltro('amenidades', novo);
  }

  /** Limpa todos os campos de filtro */
  onLimparFiltros() {
    this.serv.limparFiltros();
    this.selArea.set({ ...this.areaDom() });
    this.selQuartos.set({ ...this.quartosDom() });
    this.selSuites.set({ ...this.suitesDom() });
    this.selBanheiros.set({ ...this.banheirosDom() });
    this.selLavabos.set({ ...this.lavabosDom() });
    this.selVagas.set({ ...this.vagasDom() });
    this.selPreco.set({ ...this.precoDom() });
    this.openPreco.set(false);
  }

  /** Remove um campo isolado (para “chips”) */
  removeFiltro(campo: keyof FiltroApartamentos) {
    this.serv.atualizarCampoFiltro(campo, undefined);
  }

  /** Retorna o nome “amigável” de uma amenidade */
  getAmenidadeNome(iconKey: string): string {
    const achou = this.amenidadesDisponiveis().find(
      (x) => x.iconKey === iconKey
    );
    return achou ? achou.nome : iconKey;
  }

  /** Converte sortOrder em rótulo humano */
  getSortLabel(sortOrder?: string): string {
    const mapa: Record<string, string> = {
      'preco-asc': 'Preço (menor → maior)',
      'preco-desc': 'Preço (maior → menor)',
      'area-asc': 'Área (menor → maior)',
      'area-desc': 'Área (maior → menor)',
      'quartos-asc': 'Quartos (menor → maior)',
      'quartos-desc': 'Quartos (maior → menor)',
    };
    return sortOrder ? mapa[sortOrder] || sortOrder : '';
  }
}
