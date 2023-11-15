import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarStatsServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api/cars/count';
 
  constructor(private http: HttpClient) {}

  // Example GET request with optional parameters
  getAllCarsCount(minPrice?: number, maxPrice?: number): Observable<any> {
    let url = `${this.apiUrl}/all/${minPrice}/${maxPrice}`;
    return this.http.get(url);
  }
  getCarsCountByMakeModel(
    make: string,
    model: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<any> {
    let url = `${this.apiUrl}/make/${make}/model/${model}/${minPrice}/${maxPrice}`;
    return this.http.get(url);
  }

  getCarsCountByMake(
    make: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<any> {
    let url = `${this.apiUrl}/make/${make}/${minPrice}/${maxPrice}`;
    return this.http.get(url);
  }

  
 
}
