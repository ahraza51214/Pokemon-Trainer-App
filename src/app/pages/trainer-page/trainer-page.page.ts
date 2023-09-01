import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})
export class TrainerPage implements OnInit {
  public userPokemon: any[] = [];

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const user = this.userService.user;
    if(user && user.pokemon) {
      user.pokemon.forEach((pokemonName: string) => {
        this.http.get<any>(`${environment.pokeApiUrl}${pokemonName}`)
        .subscribe(pokemonData => {
          console.log(pokemonData);
          //const id = this.extractIdFromUrl(pokemonData.url);
          const id = pokemonData.id;

          //const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const imageUrl = pokemonData.sprites.front_default;

          this.userPokemon.push({
            name: pokemonName,
            imageUrl: imageUrl
          });
        });
      });
    }
  }
/*
  private extractIdFromUrl(url: string): number {
    const match = url.match(/(\d+)\/$/);
    return match ? +match[1] : 0;
  }*/
}
