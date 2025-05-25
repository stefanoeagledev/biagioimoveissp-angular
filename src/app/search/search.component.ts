import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule], // 👈 Add CommonModule here!
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
    this.showSuggestions = true;
    const val = this.searchQuery.toLowerCase();
    this.filteredCities = this.cities.filter((city) =>
      city.toLowerCase().includes(val)
    );
  }

  onFocus() {
    this.showSuggestions = true;
    this.filteredCities = this.cities; // show all on focus if search is empty
  }

  onBuscar() {
    this.showSuggestions = true;
    this.filteredCities = this.cities.filter((city) =>
      city.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectSuggestion(city: string) {
    this.searchQuery = city;
    this.showSuggestions = false;
  }
}
