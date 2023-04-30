import { Component } from '@angular/core';

export class Location {
  constructor(
      public _id:string,
      public name:string,
      public distance:number,
      public address:string,
      public rating:number,
      public facilities:string[],
  ) {
  }
}

@Component({
  selector: 'app-home-list',
  templateUrl: '/home-list.component.html',
  styles: [
  ]
})
export class HomeListComponent {
  location: Location = {
    _id: '6448675cf647a97027280250',
    name: 'Star Cups',
    distance: 14573.459332764041,
    address: '125 High Street, Reading, RG61PS',
    rating: 3,
    facilities: ['Hot Drinks', 'Food', 'Wifi']
  }
}
