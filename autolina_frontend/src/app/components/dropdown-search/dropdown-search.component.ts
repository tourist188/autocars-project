import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.css'],
})
export class DropdownSearchComponent {
  @Input() selectedItem: string = '';
  @Input() isInputDisabled: boolean = false;
  @Input() isDropdownOpen: boolean = false;
  @Input() filteredItems: string[] = [];
  @Input() selectedItemIndex: number | undefined;

  @Output() toggleDropdownEvent = new EventEmitter<void>();
  @Output() clearSelectedItemEvent = new EventEmitter<void>();
  @Output() selectItemEvent = new EventEmitter<{ item: string; index: number }>();

  constructor(private elementRef: ElementRef) {}

  // Function to adjust the dropdown menu height
  adjustDropdownHeight() {
    const items = this.elementRef.nativeElement.querySelectorAll(".dropdown-item");
    const itemHeight = items.length > 0 ? (items[0] as HTMLElement).offsetHeight : 0;
    const maxHeight = Math.min(items.length * itemHeight, 600); // Set a maximum height (e.g., 600px)
    const dropdownMenu = this.elementRef.nativeElement.querySelector("#myDropdown");
    if (dropdownMenu) {
      dropdownMenu.style.maxHeight = maxHeight + "px";
    }
  }

  toggleDropdown() {
    this.toggleDropdownEvent.emit();
    this.adjustDropdownHeight(); // Call the adjustDropdownHeight function when the dropdown opens
  }

  clearSelectedItem() {
    this.selectedItem = '';
    this.clearSelectedItemEvent.emit();
    this.adjustDropdownHeight(); // Call the adjustDropdownHeight function when the selected item is cleared
  }

  selectItem(item: string, index: number) {
    this.selectedItem = item;
    this.selectItemEvent.emit({ item, index });
  }
}
