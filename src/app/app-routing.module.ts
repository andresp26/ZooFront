import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AnimalesComponent } from './Pages/animales/animales.component';
import { ShowsComponent } from './Pages/shows/shows.component';

const routes: Routes = [
    {path: 'Home', component: HomeComponent},
    {path: 'Animales', component: AnimalesComponent},
    {path: 'Shows', component: ShowsComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
