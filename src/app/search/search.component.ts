import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { slugify } from '../utils/slugify';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery = '';
  cities = ['São Paulo, SP'];
  filteredCities = this.cities;
  showSuggestions = false;

  constructor(private router: Router, private el: ElementRef) {}

  onInput() {
    this.showSuggestions = true;
    const val = this.searchQuery.toLowerCase();
    this.filteredCities = this.cities.filter((c) =>
      c.toLowerCase().includes(val)
    );
  }

  onFocus() {
    this.showSuggestions = true;
    this.filteredCities = this.cities;
  }

  /** Toggle the suggestions on Buscar click */
  toggleSuggestions() {
    this.showSuggestions = !this.showSuggestions;
    if (this.showSuggestions) {
      // reset the full list when opening
      this.filteredCities = this.cities;
    }
  }

  /** When a city is clicked: close + navigate */
  selectSuggestion(city: string) {
    this.searchQuery = city;
    this.showSuggestions = false;

    const [cidade, uf] = city.split(',').map((s) => s.trim());
    const stateCode = slugify(uf);
    const citySlug = slugify(cidade);
    this.router.navigate(['/venda/imoveis', stateCode, citySlug]);
  }

  /** Clicks outside hide the dropdown */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }
}
