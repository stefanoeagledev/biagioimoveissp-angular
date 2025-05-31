import { Component, OnInit } from '@angular/core';
import { ApartamentosService } from '../../services/apartamentos.service';
import { Apartamento, Planta } from '../../models/apartamento.model';

@Component({
  selector: 'app-lista-apartamentos',
  templateUrl: './lista-apartamentos.component.html',
  styleUrls: ['./lista-apartamentos.component.css'],
})
export class ListaApartamentosComponent implements OnInit {
  apartamentos: Apartamento[] = [];

  constructor(private apartamentosService: ApartamentosService) {}

  ngOnInit(): void {
    this.apartamentosService.listarTodos().subscribe((dados) => {
      this.apartamentos = dados;
    });
  }

  areaFormatada(a: Apartamento): string {
    return a.plantas.map((p: Planta) => `${p.area} m²`).join(', ');
  }

  quartosFormatados(a: Apartamento): string {
    return a.plantas.map((p: Planta) => `${p.quartos}`).join(',');
  }

  banheirosFormatados(a: Apartamento): string {
    return a.plantas.map((p: Planta) => `${p.banheiros}`).join(',');
  }

  vagasFormatadas(a: Apartamento): string {
    return a.vagas.join(',');
  }
}
