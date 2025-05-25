import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { slugify } from '../utils/slugify'; // Correct import

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private router: Router) {}

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
    // Parse out state and city from the selected/typed city
    let stateCode = '';
    let cityName = '';

    // Try to extract from suggestions first
    const selected = this.cities.find(
      (city) => city.toLowerCase() === this.searchQuery.toLowerCase()
    );
    if (selected) {
      // Format: "Cidade, UF"
      const [cidade, uf] = selected.split(',').map((str) => str.trim());
      stateCode = slugify(uf || 'sp');
      cityName = slugify(cidade || 'sao paulo');
    } else if (this.searchQuery.includes(',')) {
      // If typed in "Cidade, UF"
      const [cidade, uf] = this.searchQuery.split(',').map((str) => str.trim());
      stateCode = slugify(uf || 'sp');
      cityName = slugify(cidade || 'sao paulo');
    } else {
      // Fallback: default to first city in list
      const [cidade, uf] = this.cities[0].split(',').map((str) => str.trim());
      stateCode = slugify(uf || 'sp');
      cityName = slugify(cidade || 'sao paulo');
    }

    console.log('Buscar clicado!');
    console.log('Estado:', stateCode);
    console.log('Cidade:', cityName);
    this.router.navigate(['/venda/imoveis', stateCode, cityName]);
  }

  selectSuggestion(city: string) {
    this.searchQuery = city;
    this.showSuggestions = false;
  }
}
