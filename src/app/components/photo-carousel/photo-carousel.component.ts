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

  /** track each image’s orientation */
  orientations: Record<string, 'portrait' | 'landscape'> = {};

  @ViewChild('scroller', { static: true })
  scroller!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    // nothing here anymore
  }

  /** called by each <img> when it finishes loading */
  onSlideLoad(src: string, img: HTMLImageElement) {
    this.orientations[src] =
      img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
  }

  scroll(dir: 'left' | 'right') {
    const el = this.scroller.nativeElement;
    el.scrollBy({
      left: (dir === 'left' ? -1 : 1) * el.clientWidth,
      behavior: 'smooth',
    });
  }
}
