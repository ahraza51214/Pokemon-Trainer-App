import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.css']
})
export class LandingPage {

  constructor(private readonly router: Router) { }

  handleLogin(): void {
    this.router.navigateByUrl('/poke-catalog');
  }
}