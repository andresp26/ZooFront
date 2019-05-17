import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { AnimalesComponent } from './Pages/animales/animales.component';
import { ShowsComponent } from './Pages/shows/shows.component';
import { NavBarComponent } from './Pages/shared/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
// Import BrowserAnimationsModule
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Import your library
import { AlertModule } from 'ngx-alerts';
import { AgGridModule } from 'ag-grid-angular';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimalesComponent,
    ShowsComponent,
    NavBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
