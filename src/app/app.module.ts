import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { AnimalesComponent } from './Pages/animales/animales.component';
import { ShowsComponent } from './Pages/shows/shows.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimalesComponent,
    ShowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
