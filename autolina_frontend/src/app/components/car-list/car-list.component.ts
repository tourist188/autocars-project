import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationLink } from 'src/app/Interfaces/car-pagination';
import { Car } from 'src/app/Interfaces/car';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AfterViewInit, Renderer2  } from '@angular/core';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent {
  cars: Car[] = [];
  carIds: number[] = [];

  isMenuOpen = false;
  @ViewChild('listContainer', { static: false }) listContainer!: ElementRef;
  selectedMake: string = '';
  selectedModel: string = '';
  minPrice: number = 0;
  maxPrice: number = 150000;
  currentPage: number = 1;
  totalPages: number = 1;
  paginationLinks: PaginationLink[] = [];
  pagesArray: number[] = [];
  sortCriteria: string = ''; 
  sortDirection: string = ''; 
  currentSort: string = 'year'; // Default sorting criteria
  currentSortDirection: string = 'desc'; // Default sorting direction
  isHovered = false;
  isPrevButtonHovered = false;
 
  lastClickedPage: number | null = null;

  // Initialize an array of booleans, one for each button
  isHoveredArray: boolean[] = Array(this.pagesArray.length).fill(false);
  isLoading: boolean = true;

  isMenuOpenedForTheFirstTime = true;
  isAnimating = false; // Add a flag to track animation state
  isListDisabled = false;
  @ViewChild('menu', { static: false }) menu!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private renderer: Renderer2
  ) {
   
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedMake = params['make'] || null;
      this.selectedModel = params['model'] || null;
      this.minPrice = params['minPrice'] || null;
      this.maxPrice = params['maxPrice'] || null;

      if (this.selectedMake == null && this.selectedModel == null) {
        // If both make and model are null, load all cars
        this.loadAllCars();
      } else if (this.selectedMake && this.selectedModel) {
        // If either make or model (or both) are not null, load cars by make and model
        this.loadCars();
      } else {
        this.loadCarsByMake();
      }
    });
  }



  goBackToTabbedComponent() {
    // Navigate to the tabbed component route
    this.router.navigate(['/']); // Replace with the actual route path
  }
  selectedSortCriteria: string | null = null;

  // Function to update the sorting criteria and fetch cars
  updateSortCriteria(sortBy: string, direction: string) {
    this.toggleMenu();
    this.currentPage = 1;
    this.currentSort = sortBy;
    this.currentSortDirection = direction;
    this.selectedSortCriteria = sortBy; // Set the selected criteria
    this.fetchCars();
  }

  // Function to fetch cars based on the current sorting criteria
  fetchCars() {
    if (this.selectedMake == null && this.selectedModel == null) {
      // If both make and model are null, load all cars
      this.loadAllCars();
    } else if (this.selectedMake && this.selectedModel) {
      // If either make or model (or both) are not null, load cars by make and model
      this.loadCars();
    } else {
      this.loadCarsByMake();
    }
  }



  // Function to load all cars with the current sorting criteria
  loadAllCars(): void {
    this.isLoading = true;
    // Call the service method to fetch all cars with the current page and sorting criteria
    this.carService
      .getAllCars(
        this.currentPage,
        this.currentSort,
        this.currentSortDirection,
        this.minPrice,
        this.maxPrice
      )
      .pipe(
        switchMap((data: any) => {
          // Handle the data and update the cars list as needed
          this.cars = data.original.cars.data;
          this.totalPages = data.original.cars.last_page;
          this.paginationLinks = data.original.cars.links;
          this.generatePagesArray();
          // Return an observable that emits after a delay of 4 seconds
          return timer(2000);
        })
      )
      .subscribe(() => {
        // After 4 seconds, set isLoading to false
        this.isLoading = false;
      });
  }

  loadCarsByMake(): void {
    // Set isLoading to true when data loading starts
    this.isLoading = true;

    // Call the service method with the current page, selected make, model, and sorting criteria
    this.carService
      .getCarsByMake(
        this.selectedMake,
        this.currentPage,
        this.currentSort,
        this.currentSortDirection,
        this.minPrice,
        this.maxPrice
      )
      .pipe(
        switchMap((data: any) => {
          // Handle the data and update the cars list as needed
          this.cars = data.original.cars.data;
          this.totalPages = data.original.cars.last_page;
          this.paginationLinks = data.original.cars.links;
          this.generatePagesArray();

          // Use timer to introduce a 4-second delay
          return timer(2000); // 4000 milliseconds = 4 seconds
        })
      )
      .subscribe(() => {
        // Set isLoading to false after the 4-second delay
        this.isLoading = false;
      });
  }

  // Function to load cars by make and model with the current sorting criteria
  loadCars(): void {
    // Set isLoading to true when data loading starts
    this.isLoading = true;

    // Call the service method with the current page, selected make, model, and sorting criteria
    this.carService
      .getCarsByMakeModel(
        this.selectedMake,
        this.selectedModel,
        this.currentPage,
        this.currentSort,
        this.currentSortDirection,
        this.minPrice,
        this.maxPrice
      )
      .pipe(
        switchMap((data: any) => {
          // Handle the data and update the cars list as needed
          this.cars = data.original.cars.data;
          this.totalPages = data.original.cars.last_page;
          this.paginationLinks = data.original.cars.links;
          this.generatePagesArray();

          // Use timer to introduce a 4-second delay
          return timer(2000); // 4000 milliseconds = 4 seconds
        })
      )
      .subscribe(() => {
        // Set isLoading to false after the 4-second delay
        this.isLoading = false;
      });
  }
  nextPage(): void {
    const nextPageLink = this.paginationLinks.find(
      (link) => link.label === 'Next &raquo;'
    );
    if (nextPageLink && nextPageLink.url) {
      // Extract the page number from the URL
      const pageNumber = this.extractPageNumber(nextPageLink.url);

      if (pageNumber > this.currentPage) {
        // Clear the hover effect for all items
        this.isHoveredArray = Array(this.pagesArray.length).fill(false);

        // Update the current page number
        this.currentPage = pageNumber;
        if (this.selectedMake == null && this.selectedModel == null) {
          // If both make and model are null, load all cars
          this.loadAllCars();
        } else if (this.selectedMake && this.selectedModel) {
          // If either make or model (or both) are not null, load cars by make and model
          this.loadCars();
        } else {
          this.loadCarsByMake();
        }
      } else {
        // Handle the case where there are no more pages
        console.log('No more pages');
      }
    }
  }

  // Function to reset hover effect when going to the previous page
  prevPage(): void {
    const prevPageLink = this.paginationLinks.find(
      (link) => link.label === '&laquo; Previous'
    );
    if (prevPageLink) {
      // Clear the hover effect for all items
      this.isHoveredArray = Array(this.pagesArray.length).fill(false);

      this.currentPage = this.extractPageNumber(prevPageLink.url);
      if (this.selectedMake == null && this.selectedModel == null) {
        // If both make and model are null, load all cars
        this.loadAllCars();
      } else if (this.selectedMake && this.selectedModel) {
        // If either make or model (or both) are not null, load cars by make and model
        this.loadCars();
      } else {
        this.loadCarsByMake();
      }
    }
  }


  private extractPageNumber(url: string): number {
   
    const match = url.match(/page=(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 1; 
  }
  private generatePagesArray() {
    const maxPagesToShow = 6; 
    let startPage = 1;
    let endPage = Math.min(this.totalPages, maxPagesToShow);

    if (this.totalPages > maxPagesToShow) {
      if (this.currentPage <= maxPagesToShow - 1) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (this.currentPage >= this.totalPages - maxPagesToShow + 1) {
        startPage = this.totalPages - maxPagesToShow + 1;
        endPage = this.totalPages;
      } else {
       
        startPage = Math.max(
          1,
          this.currentPage - Math.floor(maxPagesToShow / 2)
        );
        endPage = startPage + maxPagesToShow - 1;
        endPage = Math.min(endPage, this.totalPages);
      }
    }

    this.pagesArray = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.lastClickedPage = this.currentPage;
      this.currentPage = page;

      if (this.selectedMake == null && this.selectedModel == null) {
        // If both make and model are null, load all cars
        this.loadAllCars();
      } else if (this.selectedMake && this.selectedModel) {
        // If either make or model (or both) are not null, load cars by make and model
        this.loadCars();
      } else {
        this.loadCarsByMake();
      }
    }
  }

  toggleMenu() {
    if (this.isAnimating) {
      return; // Don't proceed if the menu is currently animating
    }

    this.isMenuOpenedForTheFirstTime = false;
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      // If closing the menu, add the 'hide-me' class and wait for the animation to complete
      this.isAnimating = true;
      this.menu.nativeElement.addEventListener(
        'animationend',
        () => {
          this.isAnimating = false;
          this.menu.nativeElement.classList.add('hide-me');
          this.isListDisabled = false; // Re-enable hover effect
        },
        { once: true }
      );
    } else {
      // If opening the menu, remove the 'hide-me' class immediately
      this.menu.nativeElement.classList.remove('hide-me');
      this.isListDisabled = true; // Disable hover effect
    }
  }

  handleMenuClick(event: Event) {
    if (this.isAnimating) {
      event.preventDefault(); // Prevent item selection during animation
    } else if (this.isMenuOpen) {
      this.toggleMenu(); // Close the menu if it's open
    }
  }

  getRotateClass() {
    if (this.isMenuOpenedForTheFirstTime) {
      return { 'hide-me': true };
    } else {
      return {
        rotateYPositive: this.isMenuOpen,
        rotateYNegative: !this.isMenuOpen,
      };
    }
  }

  onPaginationButtonHover(isHovered: boolean, index: number): void {
    this.isHoveredArray[index] = isHovered;
  }
  
}
