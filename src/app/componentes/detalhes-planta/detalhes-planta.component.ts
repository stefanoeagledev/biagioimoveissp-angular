import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planta } from '../../modelos/apartamento.model';

@Component({
  selector: 'app-detalhes-planta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-planta.component.html',
  styleUrls: ['./detalhes-planta.component.css'],
})
export class DetalhesPlantaComponent {
  @Input() planta!: Planta;
}
