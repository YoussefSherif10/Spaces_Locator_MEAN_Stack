import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "./home-list/home-list.component";
import {LocationDetails} from "./details-page/details-page.component";

@Injectable({
  providedIn: 'root'
})
export class SpacesDataService {
  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>('http://localhost:3000/api/locations?lng=-0.7992599&lat=51.378091')
  }

  public getLocationById(locationId: string): Observable<LocationDetails> {
    return this.http.get<LocationDetails>(`http://localhost:3000/api/locations/${locationId}`)
  }

  public deleteView(locationId: string, reviewId: string) {
    return this.http.delete(`http://localhost:3000/api/locations/${locationId}/reviews/${reviewId}`)
  }
}
