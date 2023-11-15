import { Component, EventEmitter, Output } from '@angular/core';
import { MakeModelServiceService } from 'src/app/services/make-model-service.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-make-search',
  templateUrl: './make-search.component.html',
  styleUrls: ['./make-search.component.css'],
})
export class MakeSearchComponent {
  isDropdownOpen = false;
  selectedItem = '';
  items: string[] = [];
  selectedItemIndex: number | undefined;
  isInputDisabled: boolean = false;

  @Output() selectedMakeChange = new EventEmitter<string>();

  constructor(
    private makeModelService: MakeModelServiceService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    // Fetch data when the component initializes
    this.makeModelService.getAllMakes().subscribe(
      (data: any) => {
        console.log(data);

        // Check if 'makes' array is present in the 'original' property
        if (
          data &&
          data.original &&
          data.original.makes &&
          Array.isArray(data.original.makes)
        ) {
          // Extract 'makes' array and convert it to an array of strings
          this.items = data.original.makes.map((make: any) => make.Name);
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
    this.selectedItem = '';
    this.sharedDataService.clearSelectedMake();
  }

  toggleDropdown() {
    if (!this.isDropdownOpen) {
      this.sharedDataService.openDropdown1();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectItem(item: string, index: number) {
    this.selectedItem = item;
    this.selectedItemIndex = index;
    this.isDropdownOpen = false;

    this.selectedMakeChange.emit(this.selectedItem);
    this.sharedDataService.setSelectedMake(this.selectedItem);
  }

  get filteredItems() {
    return this.items.filter((item) =>
      item.toLowerCase().startsWith(this.selectedItem.toLowerCase())
    );
  }
}
