import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
})
export class AmenitiesComponent {
  @Input() amenities: { nome: string; iconKey: string }[] = [];
}
