import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page.page';
import { PokeCatalogPage } from './pages/poke-catalog-page/poke-catalog-page.page';
import { TrainerPage } from './pages/trainer-page/trainer-page.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'trainer',
    component: TrainerPage
  },
  {
    path: 'poke-catalog',
    component: PokeCatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
