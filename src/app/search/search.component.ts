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
  searchQuery = '';
  cities = [
    'São Paulo, SP',
    'Campinas, SP',
    'Santos, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
  ];
  filteredCities = this.cities;
  showSuggestions = false;

  onInput() {
    this.showSuggestions = !!this.searchQuery;
    const val = this.searchQuery.toLowerCase();
    this.filteredCities = this.cities.filter((city) =>
      city.toLowerCase().includes(val)
    );
  }

  selectSuggestion(city: string) {
    this.searchQuery = city;
    this.showSuggestions = false;
  }
}
