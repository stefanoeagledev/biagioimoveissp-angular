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
import { Apartamento, Planta } from '../../modelos/apartamento.model';
import {
  ApartamentosServico,
  Amenidade,
} from '../../servicos/apartamentos.servico';
import { CardApartamentoComponent } from '../card-apartamento/card-apartamento.component';
import { FiltroApartamentos } from '../../servicos/filtro-apartamentos.model';

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
export class ListaApartamentosComponent {
  private serv = inject(ApartamentosServico);

  /** Lista filtrada conforme critérios atuais */
  apartamentos: Signal<Apartamento[]> = this.serv.apartamentosFiltrados;

  /** Critérios de filtro atualmente aplicados */
  filtroAtual: Signal<FiltroApartamentos> = this.serv.obterFiltroSignal();

  /** Lista de bairros disponíveis (para autocomplete) */
  bairrosDisponiveis: Signal<string[]> = this.serv.bairrosDisponiveis;

  /** Lista de amenidades disponíveis (iconKey + nome) */
  amenidadesDisponiveis: Signal<Amenidade[]> = this.serv.amenidadesDisponiveis;

  // ——— Domínios numéricos (mín e máx) ———
  areaDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  quartosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  suitesDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  banheirosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  lavabosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  vagasDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  precoDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  // ——— Faixas selecionadas pelos sliders ———
  selArea: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selQuartos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selSuites: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selBanheiros: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selLavabos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selVagas: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selPreco: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  constructor() {
    // Recalcula domínios sempre que a lista completa de apartamentos mudar
    effect(() => {
      const todos: Apartamento[] = this.serv.obterTodosApartamentosSignal()();

      if (todos.length === 0) {
        return;
      }

      const faixaDe = (arr: number[]): FaixaNum => ({
        min: Math.min(...arr),
        max: Math.max(...arr),
      });

      // 1) áreas
      const todasAreas: number[] = todos.flatMap((a) =>
        a.plantas.map((p) => p.area)
      );
      const fArea = faixaDe(todasAreas);
      this.areaDom.set(fArea);
      this.selArea.set({ ...fArea });

      // 2) quartos
      const todosQuartos: number[] = todos.flatMap((a) =>
        a.plantas.map((p) => p.quartos)
      );
      const fQuartos = faixaDe(todosQuartos);
      this.quartosDom.set(fQuartos);
      this.selQuartos.set({ ...fQuartos });

      // 3) suítes
      const todasSuites: number[] = todos.flatMap((a) =>
        a.plantas.map((p) => p.suites)
      );
      const fSuites = faixaDe(todasSuites);
      this.suitesDom.set(fSuites);
      this.selSuites.set({ ...fSuites });

      // 4) banheiros
      const todosBanheiros: number[] = todos.flatMap((a) =>
        a.plantas.map((p) => p.banheiros)
      );
      const fBanheiros = faixaDe(todosBanheiros);
      this.banheirosDom.set(fBanheiros);
      this.selBanheiros.set({ ...fBanheiros });

      // 5) lavabos
      const todosLavabos: number[] = todos.flatMap((a) =>
        a.plantas.map((p) => p.lavabos)
      );
      const fLavabos = faixaDe(todosLavabos);
      this.lavabosDom.set(fLavabos);
      this.selLavabos.set({ ...fLavabos });

      // 6) vagas
      const todasVagas: number[] = todos.flatMap((a) => a.vagas.map((v) => v));
      const fVagas = faixaDe(todasVagas);
      this.vagasDom.set(fVagas);
      this.selVagas.set({ ...fVagas });

      // 7) preços
      const todosPrecos: number[] = todos.flatMap((a) =>
        a.plantas.map((p) => p.preco)
      );
      const fPrecos = faixaDe(todosPrecos);
      this.precoDom.set(fPrecos);
      this.selPreco.set({ ...fPrecos });
    });
  }

  // ——— Métodos usados na template ———

  onBairroChange(texto: string) {
    this.serv.atualizarCampoFiltro('bairro', texto || undefined);
  }

  onSortChange(valor: string) {
    this.serv.atualizarCampoFiltro('sortOrder', valor || undefined);
  }

  // Área
  onAreaMinChange(valor: number) {
    this.selArea.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minArea', valor);
  }
  onAreaMaxChange(valor: number) {
    this.selArea.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxArea', valor);
  }

  // Quartos
  onQuartosMinChange(valor: number) {
    this.selQuartos.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minQuartos', valor);
  }
  onQuartosMaxChange(valor: number) {
    this.selQuartos.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxQuartos', valor);
  }

  // Suítes
  onSuitesMinChange(valor: number) {
    this.selSuites.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minSuites', valor);
  }
  onSuitesMaxChange(valor: number) {
    this.selSuites.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxSuites', valor);
  }

  // Banheiros
  onBanheirosMinChange(valor: number) {
    this.selBanheiros.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minBanheiros', valor);
  }
  onBanheirosMaxChange(valor: number) {
    this.selBanheiros.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxBanheiros', valor);
  }

  // Lavabos
  onLavabosMinChange(valor: number) {
    this.selLavabos.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minLavabos', valor);
  }
  onLavabosMaxChange(valor: number) {
    this.selLavabos.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxLavabos', valor);
  }

  // Vagas
  onVagasMinChange(valor: number) {
    this.selVagas.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minVagas', valor);
  }
  onVagasMaxChange(valor: number) {
    this.selVagas.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxVagas', valor);
  }

  // Preço
  onPrecoMinChange(valor: number) {
    this.selPreco.update((v) => ({ min: valor, max: v.max }));
    this.serv.atualizarCampoFiltro('minPreco', valor);
  }
  onPrecoMaxChange(valor: number) {
    this.selPreco.update((v) => ({ min: v.min, max: valor }));
    this.serv.atualizarCampoFiltro('maxPreco', valor);
  }

  // Amenidade (checkbox)
  onAmenidadeToggle(iconKey: string, checked: boolean) {
    const atual = this.filtroAtual().amenidades || [];
    let novo: string[];

    if (checked) {
      novo = [...atual, iconKey];
    } else {
      novo = atual.filter((k) => k !== iconKey);
    }
    this.serv.atualizarCampoFiltro('amenidades', novo);
  }

  // Limpar tudo
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

  // Remover apenas um campo de filtro (para os chips)
  removeFiltro(campo: keyof FiltroApartamentos) {
    this.serv.atualizarCampoFiltro(campo, undefined);
  }

  /**
   * Retorna o nome da amenidade a partir do iconKey.
   * Se não encontrar, retorna o próprio iconKey.
   */
  getAmenidadeNome(iconKey: string): string {
    const achou = this.amenidadesDisponiveis().find(
      (x) => x.iconKey === iconKey
    );
    return achou ? achou.nome : iconKey;
  }

  /**
   * Converte o valor de `sortOrder` (string) em rótulo legível.
   * Se for `undefined` ou não bater em nenhuma chave, devolve empty string.
   */
  getSortLabel(sortOrder?: string): string {
    const mapa: Record<string, string> = {
      'preco-asc': 'Preço (menor → maior)',
      'preco-desc': 'Preço (maior → menor)',
      'area-asc': 'Área (menor → maior)',
      'area-desc': 'Área (maior → menor)',
      'quartos-asc': 'Quartos (menor → maior)',
      'quartos-desc': 'Quartos (maior → menor)',
    };
    if (!sortOrder) {
      return '';
    }
    return mapa[sortOrder] || sortOrder;
  }
}
