export interface Planta {
  area: number;
  preco: number;
  quartos: number;
  banheiros: number;
  lavabos: number;
  foto: string;
  precoapartirde: string;
  // outros campos de planta (ex: tabelaem) podem ser adicionados conforme necessário
}

export interface Apartamento {
  id: number;
  construtora: string;
  nome: string;
  logo: string;
  status: string;
  bairro: string;
  cidade: string;
  estado: string;
  lazer?: string;
  varanda?: string;
  endereco?: string;
  vendido?: string;
  prontoEm?: string;
  lancamentoEm?: string;
  fotos: string[];
  vagas: number[];
  obsvagas?: string;
  vagasdescr?: string;
  videoId?: string;
  plantas: Planta[];
  amenidades?: { nome: string; iconKey: string }[];
}
