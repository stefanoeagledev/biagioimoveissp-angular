import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-filter.component.html',
  styleUrls: ['./results-filter.component.css'],
})
export class ResultsFilterComponent {
  @Input() filterCount = 0;
}
