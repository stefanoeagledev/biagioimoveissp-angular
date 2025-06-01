// src/app/servicos/filtro-apartamentos.model.ts

export interface FiltroApartamentos {
  bairro?: string;
  minArea?: number;
  maxArea?: number;
  minQuartos?: number;
  maxQuartos?: number;
  minSuites?: number;
  maxSuites?: number;
  minBanheiros?: number;
  maxBanheiros?: number;
  minLavabos?: number;
  maxLavabos?: number;
  minVagas?: number;
  maxVagas?: number;
  minPreco?: number;
  maxPreco?: number;

  /**
   * Lista de iconKeys de amenidades selecionadas.
   * Se vazia ou undefined, ignora esse filtro.
   */
  amenidades?: string[];

  /**
   * Critério de ordenação. Valores possíveis:
   * - 'preco-asc'
   * - 'preco-desc'
   * - 'area-asc'
   * - 'area-desc'
   * - 'quartos-asc'
   * - 'quartos-desc'
   */
  sortOrder?: string;
}
