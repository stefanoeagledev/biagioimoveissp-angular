import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartamento } from '../models/apartamento.model';

@Injectable({ providedIn: 'root' })
export class ApartamentosService {
  private jsonUrl = '/assets/apartamentos.json';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Apartamento[]> {
    return this.http.get<Apartamento[]>(this.jsonUrl);
  }
}
