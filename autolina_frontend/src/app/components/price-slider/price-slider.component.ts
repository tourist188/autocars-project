import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.css'],
})
export class CardComponent {
  @Output() priceRangeChange = new EventEmitter<{
    minPrice: number;
    maxPrice: number;
  }>();

  minPrice = 1000;
  maxPrice = 150000;
  minRange = 1000;
  maxRange = 150000;

  updateNumbers() {
    // This function updates the numbers below the handlers in real-time
    this.minPrice = this.minRange;
    this.maxPrice = this.maxRange;
  }

  sendRequest() {
    // This function sends the request using the change event after the user releases the handler
    this.priceRangeChange.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
  }

  get rangeLeft(): string {
    const minVal = this.minRange;
    const rangeInputMax = 150000;
    return (minVal / rangeInputMax) * 100 + '%';
  }

  get rangeRight(): string {
    const maxVal = this.maxRange;
    const rangeInputMax = 150000;
    return 100 - (maxVal / rangeInputMax) * 100 + '%';
  }
}
