import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MakeModelServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  // Example GET request
  getAllMakes(): Observable<any> {
    const apiUrlWithMakes = this.apiUrl + '/makes';
    return this.http.get(apiUrlWithMakes);
  }

  getModelsByMake(makeName: string): Observable<any> {
    const apiUrlWithMakes = `${this.apiUrl}/models/${makeName}`;
    console.log(apiUrlWithMakes);

    return this.http.get(apiUrlWithMakes);
  }
}
