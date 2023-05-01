import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './distance.pipe';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';

const routes = [
  {path: 'about', component: AboutComponent},
  {path: '', component: HomeListComponent}
]

@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
