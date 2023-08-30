import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing-page/landing-page.page';
import { PokeCatalogPage } from './pages/poke-catalog-page/poke-catalog-page.page';
import { TrainerPage } from './pages/trainer-page/trainer-page.page';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    PokeCatalogPage,
    TrainerPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
