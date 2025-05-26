import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.css'],
})
export class PhotoCarouselComponent {
  /** full URLs for each slide image */
  @Input() images: string[] = [];

  @ViewChild('scroller', { static: true }) scroller!: ElementRef<HTMLElement>;

  // Scroll by container width
  scroll(direction: 'left' | 'right') {
    const el = this.scroller.nativeElement;
    const amount = el.clientWidth;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }
}
