import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { Apartamento } from '../../modelos/apartamento.model';
import { switchMap, map } from 'rxjs/operators';
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
  imovel?: Apartamento;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) =>
          this.apartamentosServico
            .listarTodos()
            .pipe(map((lista) => lista.find((item) => item.id === id)))
        )
      )
      .subscribe((resultado) => {
        this.imovel = resultado || undefined;
      });
  }
}
