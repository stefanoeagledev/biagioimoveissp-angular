// src/app/servicos/apartamentos.servico.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartamento } from '../modelos/apartamento.model';

@Injectable({ providedIn: 'root' })
export class ApartamentosServico {
  private urlJson = '/assets/apartamentos.json';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Apartamento[]> {
    return this.http.get<Apartamento[]>(this.urlJson);
  }
}
