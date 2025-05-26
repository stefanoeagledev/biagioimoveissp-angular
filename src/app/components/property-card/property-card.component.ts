import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoCarouselComponent } from '../photo-carousel/photo-carousel.component';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterModule, PhotoCarouselComponent],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  @Input() imovel!: any;
  // in PropertyCardComponent
  get carouselImages() {
    const base = `/assets/${this.imovel.nome}/Apartamentos/`;
    return this.imovel.fotos.map((f: string) => base + f);
  }
}
