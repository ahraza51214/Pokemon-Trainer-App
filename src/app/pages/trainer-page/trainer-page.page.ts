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
  removePokemon(index: number): void {
    const user = this.userService.user;

    if (user) {
      // Remove the Pokémon from the user's collection.
      user.pokemon.splice(index, 1);

      // Now update this user in your backend (i.e., save the updated user data).
      // This can be done using a service call to update the user in your database.
      // Here's a hypothetical updateUserService - you'd have to implement this:
      this.userService.updateUser(user).subscribe(() => {
        // Refresh the displayed Pokémon list.
        this.userPokemon.splice(index, 1);
      });
    }
  }
}
