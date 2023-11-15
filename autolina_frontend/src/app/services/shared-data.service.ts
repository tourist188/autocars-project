import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedMakeSubject = new BehaviorSubject<string>('');
  selectedMake$: Observable<string> = this.selectedMakeSubject.asObservable();
  private isInputDisabledSubject = new BehaviorSubject<boolean>(false);
  isInputDisabled$: Observable<boolean> =
    this.isInputDisabledSubject.asObservable();

  private isDropdown1OpenSubject = new BehaviorSubject<boolean>(false);
  isDropdown1Open$: Observable<boolean> =
    this.isDropdown1OpenSubject.asObservable();

  private isDropdown2OpenSubject = new BehaviorSubject<boolean>(false);
  isDropdown2Open$: Observable<boolean> =
    this.isDropdown2OpenSubject.asObservable();

  openDropdown1() {
    this.isDropdown1OpenSubject.next(true);
    this.isDropdown2OpenSubject.next(false); // Close the second dropdown
  }

  closeDropdown1() {
    this.isDropdown1OpenSubject.next(false);
  }

  openDropdown2() {
    this.isDropdown2OpenSubject.next(true);
    this.isDropdown1OpenSubject.next(false); // Close the first dropdown
  }

  closeDropdown2() {
    this.isDropdown2OpenSubject.next(false);
  }
  setSelectedMake(make: string) {
    this.selectedMakeSubject.next(make);
    this.isInputDisabledSubject.next(false); // Enable the input when a make is selected
  }

  clearSelectedMake() {
    this.selectedMakeSubject.next('');
    this.isInputDisabledSubject.next(true); // Disable the input when make is deselected
  }
}
