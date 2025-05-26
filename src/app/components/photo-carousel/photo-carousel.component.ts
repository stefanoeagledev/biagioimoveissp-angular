import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.css'],
})
export class PhotoCarouselComponent implements AfterViewInit {
  @Input() images: string[] = [];

  /** reference to the scroll-container */
  @ViewChild('scroller', { static: true })
  scroller!: ElementRef<HTMLElement>;

  /** keep track of which images are portrait */
  @ViewChildren('slideImg')
  slides!: QueryList<ElementRef<HTMLImageElement>>;
  isVertical = new Map<string, boolean>();

  ngAfterViewInit() {
    // once each img loads, detect orientation
    this.slides.forEach((imgRef) => {
      const img = imgRef.nativeElement;
      img.addEventListener('load', () => {
        const vert = img.naturalHeight > img.naturalWidth;
        this.isVertical.set(img.src, vert);
        img.classList.toggle('vertical', vert);
      });
    });
  }

  /**
   * Scroll the container by its own width
   */
  scroll(direction: 'left' | 'right') {
    const el = this.scroller.nativeElement;
    const amount = el.clientWidth;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }
}
