// src/app/servicos/filtro-apartamentos.model.ts
export interface FiltroApartamentos {
  bairro?: string;
  minArea?: number;
  maxArea?: number;
  minQuartos?: number;
  maxQuartos?: number;
  minBanheiros?: number;
  maxBanheiros?: number;
  minVagas?: number;
  maxVagas?: number;
  minPreco?: number;
  maxPreco?: number;
  minLavabos?: number;
  maxLavabos?: number;
}
