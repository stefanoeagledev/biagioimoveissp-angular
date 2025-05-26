import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="imovel-card">
      <div class="img-wrapper">
        <img
          [src]="'/assets/' + imovel.nome + '/' + imovel.fotos[0]"
          [alt]="imovel.nome"
        />
        <button class="fav-btn">
          <span class="material-icons">favorite_border</span>
        </button>
      </div>
      <div class="card-body">
        <h3 class="title">{{ imovel.nome }}</h3>
        <div class="price">
          <span *ngIf="imovel.plantas[0]?.precoapartirde">A partir de</span>
          <strong>
            {{
              imovel.plantas[0]?.precoapartirde ||
                (imovel.plantas[0]?.preco | currency : 'BRL' : 'symbol-narrow')
            }}
          </strong>
        </div>
        <div class="location">{{ imovel.bairro }}, {{ imovel.cidade }}</div>
        <div class="area">{{ imovel.plantas[0]?.area }} m²</div>
        <div class="imovel-features">
          <span class="feature">
            <span class="material-icons">king_bed</span>
            {{ imovel.plantas[0]?.quartos }}
            {{ imovel.plantas[0]?.quartos === 1 ? 'quarto' : 'quartos' }}
          </span>
          <span class="feature">
            <span class="material-icons">bathtub</span>
            {{ imovel.plantas[0]?.banheiros }}
            {{ imovel.plantas[0]?.banheiros === 1 ? 'banheiro' : 'banheiros' }}
          </span>
          <span class="feature">
            <span class="material-icons">garage</span>
            {{ imovel.vagas[0] }}
            {{ imovel.vagas[0] === 1 ? 'vaga' : 'vagas' }}
          </span>
        </div>
        <button class="ver-detalhes-btn" [routerLink]="['/imovel', imovel.id]">
          Ver detalhes
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  @Input() imovel!: any;
}
