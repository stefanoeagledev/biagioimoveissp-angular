// src/app/componentes/pagina-inicial/pagina-inicial.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaApartamentosComponent } from '../lista-apartamentos/lista-apartamentos.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, ListaApartamentosComponent],
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
})
export class PaginaInicialComponent {}
