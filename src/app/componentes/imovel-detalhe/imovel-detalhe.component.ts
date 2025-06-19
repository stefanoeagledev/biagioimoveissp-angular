import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { Apartamento } from '../../modelos/apartamento.model';

@Component({
  selector: 'app-imovel-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './imovel-detalhe.component.html',
  styleUrls: ['./imovel-detalhe.component.css'],
})
export class ImovelDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apartamentosServico = inject(ApartamentosServico);

  imovelSignal!: Signal<Apartamento | undefined>;

  ngOnInit(): void {
    const idParam = String(this.route.snapshot.paramMap.get('id') || undefined);
    console.log(`ID do imóvel recebido: ${idParam}`);
    this.imovelSignal = this.apartamentosServico.buscarPorIdSignal(idParam);
  }
}
