declare var google: any;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
// icons
import { IonicModule } from '@ionic/angular';
// carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';
// agm
import {} from 'googlemaps';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './components/app.component';
import { CommonModule } from '@angular/common';

//pipes
import { CharLimitPipe } from './pipes/character-limit.pipe';

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
    CommonModule,
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
