import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MakeModelServiceService } from 'src/app/services/make-model-service.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
@Component({
  selector: 'app-model-search',
  templateUrl: './model-search.component.html',
  styleUrls: ['./model-search.component.css'],
})
export class ModelSearchComponent {
  isDropdownOpen = false;
  selectedItem = '';
  items: string[] = []; // Initialize as an empty array

  @Output() selectedModelChange = new EventEmitter<string>();
  @Input() makeIsSelected: boolean = false;
  selectedItemIndex: number | undefined;

  selectedMake: string = '';
  private hasSelectedMakeChanged = false; // Flag to track changes
  isInputDisabled = true; // Initial value

  constructor(
    private makeModelService: MakeModelServiceService,
    private sharedDataService: SharedDataService
  ) {
    // Initialize the items property
    this.items = [];
  }
  ngOnInit() {
    this.sharedDataService.selectedMake$.subscribe((make) => {
      if (make) {
        this.selectedMake = make;
        this.fetchData(make);
        this.isInputDisabled = false; // Enable the input when a make is selected
      } else {
        this.selectedMake = ''; // Clear the selected make
        this.isInputDisabled = true; // Disable the input when make is deselected
        this.selectedItem = ''; // Clear the model input field
      }
    });

    this.sharedDataService.isDropdown1Open$.subscribe((isOpen) => {
      // Close Fancydropdown2 when Fancydropdown1 is open
      if (isOpen) {
        this.closeDropdown();
      }
    });
  }
  
  private fetchData(make: any) {
    // Fetch data when the component initializes-------CALLED AND RUN
    this.makeModelService.getModelsByMake(make).subscribe(
      (data: any) => {
        console.log(data);

        // Check if 'models' array is present in the 'original' property
        if (
          data &&
          data.original &&
          data.original.models &&
          Array.isArray(data.original.models)
        ) {
          // Extract 'models' array and convert it to an array of strings
          this.items = data.original.models.map((model: any) => model.Name);
          console.log(this.items);
        } else {
          console.error('Data structure is not as expected.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle the error as needed
      }
    );
  }

  clearSelectedItem() {
    this.selectedItem = ''; // Clear the selected item
  }

  toggleDropdown() {
    if (!this.isDropdownOpen) {
      this.sharedDataService.openDropdown2(); // Open the second dropdown
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.sharedDataService.closeDropdown2(); // Close the second dropdown
    this.isDropdownOpen = false;
  }

  selectItem(item: string, index: number) {
    this.selectedItem = item;
    this.selectedItemIndex = index;
    this.isDropdownOpen = false;

    // Emit the selected make to the parent component
    this.selectedModelChange.emit(this.selectedItem);
  }

  get filteredItems() {
    return this.items.filter((item) =>
      item.toLowerCase().startsWith(this.selectedItem.toLowerCase())
    );
  }
}
