import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results-sort.component.html',
  styleUrls: ['./results-sort.component.css'],
})
export class ResultsSortComponent {
  sortOption = 'Mais relevante';
}
