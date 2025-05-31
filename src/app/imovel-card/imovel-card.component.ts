import { Component, Input } from '@angular/core';
import { Imovel } from '../models/imovel.model';

@Component({
  selector: 'app-imovel-card',
  templateUrl: './imovel-card.component.html',
  styleUrls: ['./imovel-card.component.scss'],
})
export class ImovelCardComponent {
  @Input() imovel!: Imovel;

  fotoIndex: number = 0;

  prevFoto() {
    if (!this.imovel.fotos || this.imovel.fotos.length === 0) return;
    this.fotoIndex =
      this.fotoIndex === 0 ? this.imovel.fotos.length - 1 : this.fotoIndex - 1;
  }

  nextFoto() {
    if (!this.imovel.fotos || this.imovel.fotos.length === 0) return;
    this.fotoIndex =
      this.fotoIndex === this.imovel.fotos.length - 1 ? 0 : this.fotoIndex + 1;
  }

  goToFoto(i: number) {
    this.fotoIndex = i;
  }
}
