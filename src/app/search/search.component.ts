import { Component, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  cities = [
    'São Paulo, SP',
    'Campinas, SP',
    'Santos, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
  ];
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

  onBuscar() {
    const selected = this.cities.find(
      (c) => c.toLowerCase() === this.searchQuery.toLowerCase()
    );
    let cidade = '',
      uf = '';
    if (selected) {
      [cidade, uf] = selected.split(',').map((s) => s.trim());
    } else if (this.searchQuery.includes(',')) {
      [cidade, uf] = this.searchQuery.split(',').map((s) => s.trim());
    } else {
      [cidade, uf] = this.cities[0].split(',').map((s) => s.trim());
    }
    const stateCode = slugify(uf);
    const citySlug = slugify(cidade);
    this.router.navigate(['/venda/imoveis', stateCode, citySlug]);
  }

  selectSuggestion(city: string) {
    this.searchQuery = city;
    this.showSuggestions = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }
}
