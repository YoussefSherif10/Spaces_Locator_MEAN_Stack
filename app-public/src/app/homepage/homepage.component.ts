import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: '/homepage.component.html',
  styles: [
  ]
})
export class HomepageComponent {
  pageContent = {
    header: {
      title: 'Spaces APP',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: [
        'Spaces Locator is a web application that can be used to locate nearby places that have wifi for you to get your work done.',
      'it can display up to 10 places around your location. Each location has the opening hours and days, facilities such as food, comfort, and others, the location on the map, and the reviews posted by people that went to these places.', '' +
      'The review is a rating and a comment. the average ratings entered by users are calculated and displayed as the main rating for that location in the main list.'
    ]
  }
}
