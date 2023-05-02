import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './distance.pipe';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeListItemComponent } from './home-list-item/home-list-item.component';

const routes = [
  {path: 'about', component: AboutComponent},
  {path: '', component: HomepageComponent}
]

@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    HomeListItemComponent
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
