import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing-page/landing-page.page';
import { PokeCatalogPage } from './pages/poke-catalog-page/poke-catalog-page.page';
import { TrainerPage } from './pages/trainer-page/trainer-page.page';
import { LoginFormComponent } from './components/landing-page/login-form/login-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    PokeCatalogPage,
    TrainerPage,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
