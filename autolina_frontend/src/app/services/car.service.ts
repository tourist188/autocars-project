import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarPagination } from '../Interfaces/car-pagination';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://127.0.0.1:8000/api/cars';

  constructor(private http: HttpClient) {}

  //GET ALL CARS

  getAllCars(
    page: number,
    sortingColumn: String,
    sortingDirection: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<CarPagination> {
    let url = `${this.apiUrl}/page/${page}/sort/${sortingColumn}/direction/${sortingDirection}/${minPrice}/${maxPrice}`;
    return this.http.get<CarPagination>(url);
  }

  getCarsByMakeModel(
    make: string,
    model: string,
    page: number,
    sortingColumn: String,
    sortingDirection: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<CarPagination> {
    let url = `${this.apiUrl}/make/${make}/model/${model}/page/${page}/sort/${sortingColumn}/direction/${sortingDirection}/${minPrice}/${maxPrice}`;
    return this.http.get<CarPagination>(url);
  }

  getCarsByMake(
    make: string,
    page: number,
    sortingColumn: String,
    sortingDirection: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<CarPagination> {
    let url = `${this.apiUrl}/make/${make}/page/${page}/sort/${sortingColumn}/direction/${sortingDirection}/${minPrice}/${maxPrice}`;
    return this.http.get<CarPagination>(url);
  }
}
