import {
  Component,
  OnInit,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
}
