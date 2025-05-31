// src/app/componentes/imovel-detalhe/imovel-detalhe.component.ts

import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { Apartamento } from '../../modelos/apartamento.model';
import { DetalhesPlantaComponent } from '../detalhes-planta/detalhes-planta.component';
import { ListaAmenidadesComponent } from '../lista-amenidades/lista-amenidades.component';

@Component({
  selector: 'app-imovel-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DetalhesPlantaComponent,
    ListaAmenidadesComponent,
  ],
  templateUrl: './imovel-detalhe.component.html',
  styleUrls: ['./imovel-detalhe.component.css'],
})
export class ImovelDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apartamentosServico = inject(ApartamentosServico);

  /** Signal que guarda o id do imóvel */
  idSelecionado!: number;

  /** Signal / Computed que aponta para o Apartamento ou undefined */
  imovelSignal!: Signal<Apartamento | undefined>;

  ngOnInit(): void {
    // 1) Extrair o parâmetro “id” da rota
    const idParam = Number(this.route.snapshot.paramMap.get('id') || NaN);
    this.idSelecionado = isNaN(idParam) ? -1 : idParam;

    // 2) Criar o computed que busca o apartamento por ID:
    this.imovelSignal = this.apartamentosServico.buscarPorIdSignal(
      this.idSelecionado
    );
    // - quando o sinal de todosApartamentos for populado,
    //   este computed retornará o objeto correto ou undefined.
  }
}
