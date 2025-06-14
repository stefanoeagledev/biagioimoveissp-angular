// src/app/componentes/card-apartamento/card-apartamento.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Apartamento, Planta } from '../../modelos/apartamento.model';

@Component({
  selector: 'app-card-apartamento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card card-apartamento">
      <img
        *ngIf="a.foto_card && a.foto_card.length > 0"
        class="card-img-top"
        [src]="'/assets/' + a.foto_card[0]"
        alt="Fachada do {{ a.nome }}"
      />

      <div class="card-body">
        <h2 class="card-title">{{ a.nome }}</h2>
        <p class="card-local">{{ a.bairro }}, {{ a.cidade }}</p>

        <div class="detalhes-lista">
          <!-- ÁREA -->
          <div *ngIf="areaFormatada()" class="detalhe-item">
            <span class="material-icons detalhe-icone">square_foot</span>
            <span class="detalhe-texto">{{ areaFormatada() }}</span>
          </div>

          <!-- QUARTOS (+ SUÍTES ENTRE PARÊNTESES) -->
          <div *ngIf="quartosFormatados()" class="detalhe-item">
            <span class="material-icons detalhe-icone">king_bed</span>
            <span class="detalhe-texto">
              {{ quartosFormatados() }}
              {{ pluralize(quartosUnicos(), 'quarto', 'quartos') }}
              <ng-container *ngIf="suitesFormatadas()">
                ({{ suitesFormatadas() }}
                {{ pluralize(suitesUnicas(), 'suíte', 'suítes') }})
              </ng-container>
            </span>
          </div>

          <!-- BANHEIROS (+ LAVABOS ENTRE PARÊNTESES) -->
          <div *ngIf="banheirosFormatados()" class="detalhe-item">
            <span class="material-icons detalhe-icone">bathtub</span>
            <span class="detalhe-texto">
              {{ banheirosFormatados() }}
              {{ pluralize(banheirosUnicos(), 'banheiro', 'banheiros') }}
              <ng-container *ngIf="lavabosFormatados()">
                ({{ lavabosFormatados() }}
                {{ pluralize(lavabosUnicos(), 'lavabo', 'lavabos') }})
              </ng-container>
            </span>
          </div>

          <!-- VAGAS -->
          <div *ngIf="vagasFormatadas()" class="detalhe-item">
            <span class="material-icons detalhe-icone">garage</span>
            <span class="detalhe-texto">
              {{ vagasFormatadas() }}
              {{ pluralize(vagasUnicas(), 'vaga', 'vagas') }}
              <ng-container *ngIf="a.vagasdescr">
                {{ a.vagasdescr }}
              </ng-container>
              <ng-container *ngIf="a.obsvagas">
                {{ a.obsvagas }}
              </ng-container>
            </span>
          </div>

          <!-- LAZER (se existir) -->
          <div *ngIf="a.lazer" class="detalhe-item">
            <span class="material-icons detalhe-icone">pool</span>
            <!-- Prefixo “lazer” adicionado fixo -->
            <span class="detalhe-texto">lazer {{ a.lazer }}</span>
          </div>

          <!-- VARANDA (se existir) -->
          <div *ngIf="a.varanda" class="detalhe-item">
            <span class="material-icons detalhe-icone">outdoor_grill</span>
            <!-- Prefixo “varanda” adicionado fixo -->
            <span class="detalhe-texto">varanda {{ a.varanda }}</span>
          </div>
        </div>

        <a
          [routerLink]="['/imovel', a.id]"
          class="btn btn-primary btn-ver-detalhes"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./card-apartamento.component.css'],
})
export class CardApartamentoComponent {
  @Input() a!: Apartamento;

  /** retorna algo como "56 e 74 m²" (sem duplicatas) */
  areaFormatada(): string {
    const arr = this.a.plantas.map((p: Planta) => `${p.area} m²`);
    return this.formatarLista(arr, 'ou');
  }

  // —— QUARTOS ——
  private _quartosUnicos: string[] | null = null;
  quartosUnicos(): number[] {
    if (!this._quartosUnicos) {
      // filtra apenas valores de quartos > 0
      const apenasPositivos = this.a.plantas
        .map((p) => p.quartos)
        .filter((q) => q > 0);
      this._quartosUnicos = Array.from(
        new Set(apenasPositivos.map((q) => q.toString()))
      );
    }
    return this._quartosUnicos.map((s) => Number(s));
  }
  quartosFormatados(): string {
    const arr = this.quartosUnicos().map((n) => n.toString());
    return this.formatarLista(arr, 'ou');
  }

  // —— SUÍTES ——
  private _suitesUnicas: string[] | null = null;
  suitesUnicas(): number[] {
    if (!this._suitesUnicas) {
      // filtra apenas valores de suítes > 0
      const apenasPositivos = this.a.plantas
        .map((p) => p.suites)
        .filter((s) => s > 0);
      this._suitesUnicas = Array.from(
        new Set(apenasPositivos.map((s) => s.toString()))
      );
    }
    return this._suitesUnicas.map((s) => Number(s));
  }
  suitesFormatadas(): string {
    const únicos = this.suitesUnicas();
    if (únicos.length === 0) {
      return '';
    }
    const arr = únicos.map((n) => n.toString());
    return this.formatarLista(arr, 'ou');
  }

  // —— BANHEIROS ——
  private _banheirosUnicos: string[] | null = null;
  banheirosUnicos(): number[] {
    if (!this._banheirosUnicos) {
      // filtra apenas valores de banheiros > 0
      const apenasPositivos = this.a.plantas
        .map((p) => p.banheiros)
        .filter((b) => b > 0);
      this._banheirosUnicos = Array.from(
        new Set(apenasPositivos.map((b) => b.toString()))
      );
    }
    return this._banheirosUnicos.map((s) => Number(s));
  }
  banheirosFormatados(): string {
    const arr = this.banheirosUnicos().map((n) => n.toString());
    return this.formatarLista(arr, 'ou');
  }

  // —— LAVABOS ——
  private _lavabosUnicos: string[] | null = null;
  lavabosUnicos(): number[] {
    if (!this._lavabosUnicos) {
      // filtra apenas valores de lavabos > 0
      const apenasPositivos = this.a.plantas
        .map((p) => p.lavabos)
        .filter((l) => l > 0);
      this._lavabosUnicos = Array.from(
        new Set(apenasPositivos.map((l) => l.toString()))
      );
    }
    return this._lavabosUnicos.map((s) => Number(s));
  }
  lavabosFormatados(): string {
    const únicos = this.lavabosUnicos();
    if (únicos.length === 0) {
      return '';
    }
    const arr = únicos.map((n) => n.toString());
    return this.formatarLista(arr, 'ou');
  }

  // —— VAGAS ——
  private _vagasUnicas: string[] | null = null;
  vagasUnicas(): number[] {
    if (!this._vagasUnicas) {
      // filtra apenas valores de vagas > 0
      const apenasPositivos = this.a.vagas.filter((v) => v > 0);
      this._vagasUnicas = Array.from(
        new Set(apenasPositivos.map((v) => v.toString()))
      );
    }
    return this._vagasUnicas.map((s) => Number(s));
  }
  vagasFormatadas(): string {
    const arr = this.vagasUnicas().map((n) => n.toString());
    return this.formatarLista(arr, 'ou');
  }

  /**
   * Formata lista de strings (sem repetição) unindo com vírgula,
   * e usando `conj` (“e” ou “ou”) antes do último elemento.
   */
  private formatarLista(items: string[], conj: 'e' | 'ou'): string {
    const únicos = Array.from(new Set(items));
    if (únicos.length === 0) return '';
    if (únicos.length === 1) return únicos[0];
    if (únicos.length === 2) return `${únicos[0]} ${conj} ${únicos[1]}`;
    const todosMenosUltimo = únicos.slice(0, -1).join(', ');
    const último = únicos[únicos.length - 1];
    return `${todosMenosUltimo} ${conj} ${último}`;
  }

  /**
   * Retorna singular ou plural (“quarto(s)”, “suíte(s)”, “lavabo(s)”),
   * de acordo com o maior valor no array.
   * Se apenas [1], usa singular; caso contrário, plural.
   */
  pluralize(arr: number[], singular: string, plural: string): string {
    if (arr.length === 1 && arr[0] === 1) {
      return singular;
    }
    return plural;
  }
}
