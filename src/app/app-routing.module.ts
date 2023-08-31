import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page.page';
import { PokeCatalogPage } from './pages/poke-catalog-page/poke-catalog-page.page';
import { TrainerPage } from './pages/trainer-page/trainer-page.page';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/login"
  },
  {
    path: 'login',
    component: LandingPage
  },
  {
    path: 'trainer',
    component: TrainerPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'poke-catalog',
    component: PokeCatalogPage,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
