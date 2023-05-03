import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "../about/about.component";
import {DetailsPageComponent} from "../details-page/details-page.component";
import {HomepageComponent} from "../homepage/homepage.component";

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'location/:locationId', component: DetailsPageComponent},
  {path: '', component: HomepageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
