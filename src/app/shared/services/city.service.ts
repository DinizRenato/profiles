import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cityUrl = 'api/cities';

  constructor(private http: HttpClient) { }

  getCitiesByName(term: string): Observable<City[]> {
    const url = `${this.cityUrl}/?city=${term}`;
    return this.http.get<City[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
