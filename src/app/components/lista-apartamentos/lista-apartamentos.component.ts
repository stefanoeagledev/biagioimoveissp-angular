// src/app/components/lista-apartamentos/lista-apartamentos.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { ApartamentosServico } from '../../servicos/apartamentos.servico';
import { Apartamento } from '../../modelos/apartamento.model';
import { CardApartamentoComponent } from '../card-apartamento/card-apartamento.component';

@Component({
  selector: 'app-lista-apartamentos',
  standalone: true,
  imports: [CommonModule, CardApartamentoComponent],
  template: `
    <ng-container *ngFor="let a of apartamentos()">
      <app-card-apartamento [a]="a"></app-card-apartamento>
    </ng-container>
  `,
  styleUrls: ['./lista-apartamentos.component.css'],
})
export class ListaApartamentosComponent implements OnInit {
  private apartamentosServico = inject(ApartamentosServico);
  apartamentos: WritableSignal<Apartamento[]> = signal<Apartamento[]>([]);

  ngOnInit(): void {
    this.apartamentosServico.listarTodos().subscribe((dados) => {
      this.apartamentos.set(dados);
    });
  }

  areaFormatada(a: Apartamento): string {
    return a.plantas.map((p) => `${p.area} m²`).join(', ');
  }

  quartosFormatados(a: Apartamento): string {
    return a.plantas.map((p) => `${p.quartos}`).join(',');
  }

  banheirosFormatados(a: Apartamento): string {
    return a.plantas.map((p) => `${p.banheiros}`).join(',');
  }

  vagasFormatadas(a: Apartamento): string {
    return a.vagas.join(',');
  }
}
