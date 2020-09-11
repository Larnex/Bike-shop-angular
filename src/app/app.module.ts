declare var google: any;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import {
  CharLimitPipe,
  MainPageComponent,
} from './main-page/main-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
// icons
import { IonicModule } from '@ionic/angular';
// carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';
// agm
import {} from 'googlemaps';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ContactPageComponent,
    CharLimitPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IvyCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDD9woHUDfiRIDQFZdRnY-nckUjlsUvjyQ',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
