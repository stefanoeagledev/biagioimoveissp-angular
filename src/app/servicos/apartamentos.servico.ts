// src/app/servicos/apartamentos.servico.ts
import { Injectable, computed, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apartamento } from '../modelos/apartamento.model';
import { FiltroApartamentos } from './filtro-apartamentos.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApartamentosServico {
  private urlJson = '/assets/apartamentos.json';

  /** Sinal que guarda a lista completa de apartamentos */
  private _todosApartamentos: WritableSignal<Apartamento[]> = signal<
    Apartamento[]
  >([]);

  /** Sinal que guarda o objeto de filtro atual */
  private _criterioFiltro: WritableSignal<FiltroApartamentos> =
    signal<FiltroApartamentos>({});

  /**
   * Computed que produz a lista de apartamentos de acordo
   * com o critério de filtro atual
   */
  apartamentosFiltrados = computed(() => {
    const lista = this._todosApartamentos();
    const filtro = this._criterioFiltro();

    return lista.filter((apt) => {
      // --- FILTRO POR BAIRRO ---
      if (filtro.bairro && filtro.bairro.trim() !== '') {
        if (
          !apt.bairro.toLowerCase().includes(filtro.bairro.trim().toLowerCase())
        ) {
          return false;
        }
      }

      // → FILTRO POR SUÍTES (se houver minSuites ou maxSuites):
      if (filtro.minSuites != null || filtro.maxSuites != null) {
        const suitesArray = apt.plantas.map((p) => p.suites);
        const minSu = Math.min(...suitesArray);
        const maxSu = Math.max(...suitesArray);
        if (filtro.minSuites != null && maxSu < filtro.minSuites) return false;
        if (filtro.maxSuites != null && minSu > filtro.maxSuites) return false;
      }

      // → FILTRO POR LAVABOS (se houver minLavabos ou maxLavabos):
      if (filtro.minLavabos != null || filtro.maxLavabos != null) {
        const lavabosArray = apt.plantas.map((p) => p.lavabos);
        const minLv = Math.min(...lavabosArray);
        const maxLv = Math.max(...lavabosArray);
        if (filtro.minLavabos != null && maxLv < filtro.minLavabos)
          return false;
        if (filtro.maxLavabos != null && minLv > filtro.maxLavabos)
          return false;
      }

      // --- FILTRO POR ÁREA ---
      if (filtro.minArea != null || filtro.maxArea != null) {
        const areas = apt.plantas.map((p) => p.area);
        const areaMinima = Math.min(...areas);
        const areaMaxima = Math.max(...areas);

        if (filtro.minArea != null && areaMaxima < filtro.minArea) return false;
        if (filtro.maxArea != null && areaMinima > filtro.maxArea) return false;
      }

      // --- FILTRO POR QUARTOS ---
      if (filtro.minQuartos != null || filtro.maxQuartos != null) {
        const quartosArray = apt.plantas.map((p) => p.quartos);
        const minQt = Math.min(...quartosArray);
        const maxQt = Math.max(...quartosArray);

        if (filtro.minQuartos != null && maxQt < filtro.minQuartos)
          return false;
        if (filtro.maxQuartos != null && minQt > filtro.maxQuartos)
          return false;
      }

      // --- FILTRO POR BANHEIROS ---
      if (filtro.minBanheiros != null || filtro.maxBanheiros != null) {
        const banheirosArray = apt.plantas.map((p) => p.banheiros);
        const minBn = Math.min(...banheirosArray);
        const maxBn = Math.max(...banheirosArray);

        if (filtro.minBanheiros != null && maxBn < filtro.minBanheiros)
          return false;
        if (filtro.maxBanheiros != null && minBn > filtro.maxBanheiros)
          return false;
      }

      // --- FILTRO POR LAVABOS (NOVO) ---
      if (filtro.minLavabos != null || filtro.maxLavabos != null) {
        const lavabosArray = apt.plantas.map((p) => p.lavabos);
        const minLv = Math.min(...lavabosArray);
        const maxLv = Math.max(...lavabosArray);

        if (filtro.minLavabos != null && maxLv < filtro.minLavabos)
          return false;
        if (filtro.maxLavabos != null && minLv > filtro.maxLavabos)
          return false;
      }

      // --- FILTRO POR VAGAS ---
      if (filtro.minVagas != null || filtro.maxVagas != null) {
        const vagasMin = Math.min(...apt.vagas);
        const vagasMax = Math.max(...apt.vagas);

        if (filtro.minVagas != null && vagasMax < filtro.minVagas) return false;
        if (filtro.maxVagas != null && vagasMin > filtro.maxVagas) return false;
      }

      // --- FILTRO POR PREÇO ---
      if (filtro.minPreco != null || filtro.maxPreco != null) {
        const precos = apt.plantas.map((p) => p.preco);
        const precoMinimo = Math.min(...precos);
        const precoMaximo = Math.max(...precos);

        if (filtro.minPreco != null && precoMaximo < filtro.minPreco)
          return false;
        if (filtro.maxPreco != null && precoMinimo > filtro.maxPreco)
          return false;
      }

      return true; // passou em todos os filtros
    });
  });

  constructor(private http: HttpClient) {
    // Carrega o JSON estático no construtor
    this.http
      .get<Apartamento[]>(this.urlJson)
      .pipe(map((arr) => arr || []))
      .subscribe((dados) => {
        this._todosApartamentos.set(dados);
      });
  }

  /** Expõe o computed para consumo nos componentes */
  obterApartamentosFiltradosSignal() {
    return this.apartamentosFiltrados;
  }

  /** Substitui todo o critério de filtro */
  atualizarFiltro(novoFiltro: FiltroApartamentos) {
    this._criterioFiltro.set(novoFiltro);
  }

  /** Atualiza apenas um campo específico, mantendo os demais */
  atualizarCampoFiltro<c extends keyof FiltroApartamentos>(
    campo: c,
    valor: FiltroApartamentos[c]
  ) {
    const atual = this._criterioFiltro();
    this._criterioFiltro.set({ ...atual, [campo]: valor });
  }

  /** Limpa todos os filtros (volta a {}) */
  limparFiltros() {
    this._criterioFiltro.set({});
  }

  obterTodosApartamentosSignal() {
    return this._todosApartamentos;
  }

  buscarPorIdSignal(id: number) {
    return computed(() => this._todosApartamentos().find((a) => a.id === id));
  }
}
