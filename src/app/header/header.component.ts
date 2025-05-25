import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true, // <-- add this!
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
