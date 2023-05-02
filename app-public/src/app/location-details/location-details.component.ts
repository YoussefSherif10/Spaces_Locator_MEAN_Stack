import {Component, Input} from '@angular/core';
import {LocationDetails} from "../details-page/details-page.component";

@Component({
  selector: 'app-location-details',
  templateUrl: '/location-details.component.html',
  styles: []
})
export class LocationDetailsComponent {
  @Input() location!: LocationDetails;
  googleApiKey:string = 'AIzaSyDX0W0bSoP2P81jHe4JcC1JaGXMRC4kXCo';
}
