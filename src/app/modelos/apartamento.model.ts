export interface Planta {
  area: number;
  preco: number;
  quartos: number;
  suites: number;
  banheiros: number;
  lavabos: number;
  precoapartirde: string;
  foto: string;
  tabelaem?: string;
}

export interface Apartamento {
  id: string;
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
  vagas: number[];
  obsvagas?: string;
  vagasdescr?: string;
  videoId?: string;

  foto_fachada: string[];
  foto_card: string[];
  fotos_apartamentos: string[];
  fotos_lazer: string[];
  fotos_implantacao: string[];

  plantas: Planta[];
  amenidades?: { nome: string; iconKey: string }[];
}
