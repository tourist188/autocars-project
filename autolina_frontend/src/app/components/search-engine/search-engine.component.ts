import { CarStatsServiceService } from '../../services/car-stats-service.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { MatSliderThumb } from '@angular/material/slider';
import { Router } from '@angular/router';

import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SearchEngineComponent {
  showLoadingAnimation = false;
  hits: any = null; // Initialize hits as null
  currentTab = 0;
  tabPosition = 0;
  focusedTabIndex: number | null = null;
  initiallyFocusedTabIndex = 0; 

 

  @Output() selectedMakeChange = new EventEmitter<string>();
  minPrice: number | undefined = 1000; 
  maxPrice: number | undefined = 150000; 

  selectedMake: string = ''; 
  selectedModel: string = ''; 

  listItems: string[] = [
    'Free only for private individuals',
    'Purchase offers from car dealers',
    'Sell at the best possible price',
    'Optional premium advertisement bookable',
  ];

  constructor(
    private carService: CarService,
    private carCountService: CarStatsServiceService,
    private router: Router
  ) {}

  onSelectedMakeChange(selectedMake: string) {
    this.selectedMake = selectedMake;
    this.selectedMakeChange.emit(this.selectedMake);

    this.carCountService
      .getCarsCountByMake(this.selectedMake, this.minPrice, this.maxPrice)
      .subscribe((data) => {
        this.showLoadingAnimation = true;
        console.log(data.original.car_count);

        setTimeout(() => {
          this.hits = data.original.car_count;
          this.showLoadingAnimation = false;
        }, 500); // 1000 milliseconds = 1 second
      });
  }

  onSelectedModelChange(selectedModel: string) {
    this.selectedModel = selectedModel;
    this.carCountService
      .getCarsCountByMakeModel(
        this.selectedMake,
        this.selectedModel,
        this.minPrice,
        this.maxPrice
      )
      .subscribe((data) => {
        this.showLoadingAnimation = true;
        console.log(data.original.car_count);

        setTimeout(() => {
          this.hits = data.original.car_count;
          this.showLoadingAnimation = false;
        }, 500); // 1000 milliseconds = 1 second
      });
  }

  fetchCars() {
    // Always navigate to car-list with selected make and model
    this.showLoadingAnimation = true;
    setTimeout(() => {
      this.showLoadingAnimation = false;
      // Use router.navigate with the route and route parameters
      this.router.navigate([
        '/car-list',
        this.selectedMake,
        this.selectedModel,
        this.minPrice,
        this.maxPrice,
      ]);
    }, 500);
  }

  ngOnInit(): void {
    this.carCountService.getAllCarsCount(this.minPrice,this.maxPrice).subscribe((data) => {
      this.showLoadingAnimation = true;
      setTimeout(() => {
        this.hits = data;
        this.showLoadingAnimation = false;
      }, 500);
    });
  }
  //Handle Slider Change min-max Price
  onPriceRangeChange(eventData: { minPrice: number; maxPrice: number }) {
    // Handle the event data here, e.g., send a request to the database
    console.log('Min Price:', eventData.minPrice);
    console.log('Max Price:', eventData.maxPrice);

    this.minPrice = eventData.minPrice;
    this.maxPrice = eventData.maxPrice;
  
    if (this.selectedMake == '' && this.selectedModel == '') {
     
      this.carCountService
        .getAllCarsCount(eventData.minPrice, eventData.maxPrice)
        .subscribe((data) => {
          this.showLoadingAnimation = true;
          setTimeout(() => {
            this.hits = data;
            this.showLoadingAnimation = false;
          }, 500); // 1000 milliseconds = 1 second
        });
    } else if (this.selectedMake && this.selectedModel == '') {
      this.carCountService
        .getCarsCountByMake(this.selectedMake, this.minPrice, this.maxPrice)
        .subscribe((data) => {
          this.showLoadingAnimation = true;
          console.log(data.original.car_count);

          setTimeout(() => {
            this.hits = data.original.car_count;
            this.showLoadingAnimation = false;
          }, 500); // 1000 milliseconds = 1 second
        });
    } else if (this.selectedMake != '' && this.selectedModel != '') {
      console.log('Min Price='+this.minPrice);
      console.log('Max Price='+this.maxPrice);
      
      this.carCountService
        .getCarsCountByMakeModel(
          this.selectedMake,
          this.selectedModel,
          this.minPrice,
          this.maxPrice
        )
        .subscribe((data) => {
          this.showLoadingAnimation = true;
          console.log(data.original.car_count);

          setTimeout(() => {
            this.hits = data.original.car_count;
            this.showLoadingAnimation = false;
          }, 500); // 1000 milliseconds = 1 second
        });
    }
  }
}
