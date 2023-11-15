import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css'],
})
export class CardCarouselComponent {
  @Input() car: any;
  imageUrls: string[] = [];
  defaultImageUrl =
    'https://media.istockphoto.com/id/1138179183/vector/no-image-available-sign.jpg?s=612x612&w=0&k=20&c=wJLkJNHgmT9v7bqmCs5uvLcRro437iyasa5RdgFGsoE=';

  currentIndex = 0;
  ngOnInit() {
    this.imageUrls = this.car.urls;
  }
  updateCarousel(offset: number): void {
    this.currentIndex =
      (this.currentIndex + offset + this.imageUrls.length) %
      this.imageUrls.length;
  }
}
