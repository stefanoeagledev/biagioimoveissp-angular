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
export class ListaApartamentosComponent {
  private serv = inject(ApartamentosServico);

  /** Signal que aponta para a lista filtrada de apartamentos */
  apartamentos: Signal<Apartamento[]> = this.serv.apartamentosFiltrados;

  // ─── DOMÍNIOS (serão preenchidos dinamicamente) ───────────────────
  areaDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  quartosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  suitesDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  banheirosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  lavabosDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  vagasDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  precoDom: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  // ─── VALORES SELECIONADOS (inicializados depois que o domínio aparecer) ─
  selArea: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selQuartos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selSuites: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selBanheiros: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selLavabos: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selVagas: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });
  selPreco: WritableSignal<FaixaNum> = signal({ min: 0, max: 0 });

  constructor() {
    // Registramos o effect já no construtor,
    // para que ele “pegue” o sinal assim que o JSON chegar.
    effect(() => {
      // 1) Leia o sinal bruto de todos os apartamentos
      const todos: Apartamento[] = this.serv.obterTodosApartamentosSignal()();

      // Se ainda não carregou nada, saia (evita setar 0–0 para sempre)
      if (todos.length === 0) {
        return;
      }

      // Auxiliar para extrair { min, max } de qualquer array de números
      const faixaDe = (arr: number[]): FaixaNum => ({
        min: Math.min(...arr),
        max: Math.max(...arr),
      });

      //
      // 2) DOMÍNIO DE ÁREA
      //
      // Aqui anotamos explicitamente a tipagem:
      const todasAreas: number[] = todos.flatMap((a: Apartamento) =>
        a.plantas.map((p: Planta) => p.area)
      );
      const faixaArea = faixaDe(todasAreas);
      this.areaDom.set(faixaArea);
      this.selArea.set({ ...faixaArea });

      //
      // 3) DOMÍNIO DE QUARTOS
      //
      const todosQuartos: number[] = todos.flatMap((a: Apartamento) =>
        a.plantas.map((p: Planta) => p.quartos)
      );
      const faixaQuartos = faixaDe(todosQuartos);
      this.quartosDom.set(faixaQuartos);
      this.selQuartos.set({ ...faixaQuartos });

      //
      // 4) DOMÍNIO DE SUÍTES
      //
      const todasSuites: number[] = todos.flatMap((a: Apartamento) =>
        a.plantas.map((p: Planta) => p.suites)
      );
      const faixaSuites = faixaDe(todasSuites);
      this.suitesDom.set(faixaSuites);
      this.selSuites.set({ ...faixaSuites });

      //
      // 5) DOMÍNIO DE BANHEIROS
      //
      const todosBanheiros: number[] = todos.flatMap((a: Apartamento) =>
        a.plantas.map((p: Planta) => p.banheiros)
      );
      const faixaBanheiros = faixaDe(todosBanheiros);
      this.banheirosDom.set(faixaBanheiros);
      this.selBanheiros.set({ ...faixaBanheiros });

      //
      // 6) DOMÍNIO DE LAVABOS
      //
      const todosLavabos: number[] = todos.flatMap((a: Apartamento) =>
        a.plantas.map((p: Planta) => p.lavabos)
      );
      const faixaLavabos = faixaDe(todosLavabos);
      this.lavabosDom.set(faixaLavabos);
      this.selLavabos.set({ ...faixaLavabos });

      //
      // 7) DOMÍNIO DE VAGAS
      //
      const todasVagas: number[] = todos.flatMap((a: Apartamento) =>
        a.vagas.map((v: number) => v)
      );
      const faixaVagas = faixaDe(todasVagas);
      this.vagasDom.set(faixaVagas);
      this.selVagas.set({ ...faixaVagas });

      //
      // 8) DOMÍNIO DE PREÇOS
      //
      const todosPrecos: number[] = todos.flatMap((a: Apartamento) =>
        a.plantas.map((p: Planta) => p.preco)
      );
      const faixaPrecos = faixaDe(todosPrecos);
      this.precoDom.set(faixaPrecos);
      this.selPreco.set({ ...faixaPrecos });
    });
  }

  // ——— Métodos chamados pelo template ———

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
