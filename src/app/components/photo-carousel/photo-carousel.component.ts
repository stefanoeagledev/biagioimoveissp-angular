import {
  Component,
  Input,
  ElementRef,
  ViewChild,
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

  /** Optional: prefix for your alt text, e.g. the property name */
  @Input() altTextPrefix = '';

  @ViewChild('scroller', { static: true })
  scroller!: ElementRef<HTMLElement>;

  orientations: Record<string, 'portrait' | 'landscape'> = {};
  currentIndex = 0;

  ngAfterViewInit() {
    // nothing needed here for now
  }

  onSlideLoad(src: string, img: HTMLImageElement) {
    this.orientations[src] =
      img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
  }

  /**
   * Always grab the scroller from the ViewChild,
   * then scroll it and update currentIndex
   */
  scroll(dir: 'left' | 'right') {
    const el = this.scroller.nativeElement;
    // move by one full “page”
    el.scrollBy({
      left: (dir === 'left' ? -1 : 1) * el.clientWidth,
      behavior: 'smooth',
    });
    // after scroll, update which slide we’re on
    this.currentIndex = Math.round(el.scrollLeft / el.clientWidth);
  }

  goTo(i: number) {
    const el = this.scroller.nativeElement;
    el.scrollTo({
      left: i * el.clientWidth,
      behavior: 'smooth',
    });
    this.currentIndex = i;
  }

  onScroll() {
    const el = this.scroller.nativeElement;
    this.currentIndex = Math.round(el.scrollLeft / el.clientWidth);
  }
}
