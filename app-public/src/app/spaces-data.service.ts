import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "./home-list/home-list.component";
import {LocationDetails, Review} from "./details-page/details-page.component";

@Injectable({
  providedIn: 'root'
})
export class SpacesDataService {
  addressApi(): string {
    if (isDevMode())
      return 'http://localhost:3000/api/locations';
    return 'https://spaces-locator.onrender.com/api/locations';
  }
  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.addressApi()}?lng=-0.7992599&lat=51.378091`)
  }

  public getLocationById(locationId: string): Observable<LocationDetails> {
    return this.http.get<LocationDetails>(`${this.addressApi()}/${locationId}`)
  }

  public deleteView(locationId: string, reviewId: string) {
    return this.http.delete(`${this.addressApi()}/${locationId}/reviews/${reviewId}`)
  }

  public addReview(locationId: string, formData: any): Observable<Review> {
    return this.http.post<Review>(`${this.addressApi()}/${locationId}/reviews`, formData);
  }
}
