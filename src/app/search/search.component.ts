import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  states = [
    {
      code: 'SP',
      name: 'São Paulo',
      cities: ['São Paulo', 'Campinas', 'Santos'],
    },
    {
      code: 'RJ',
      name: 'Rio de Janeiro',
      cities: ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
    },
    // Add more states/cities as needed
  ];

  selectedState = this.states[0];
  selectedCity = this.states[0].cities[0];

  onStateChange(event: any) {
    const state = this.states.find((s) => s.code === event.target.value);
    if (state) {
      this.selectedState = state;
      this.selectedCity = state.cities[0];
    }
  }
}
