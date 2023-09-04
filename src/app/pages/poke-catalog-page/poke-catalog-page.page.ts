import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';


/*
Here, we're using the PokeapiService to load the Pokémon list when 
the component initializes and storing the results in pokemonList.
*/
@Component({
  selector: 'app-poke-catalogue',
  templateUrl: './poke-catalog-page.page.html',
  styleUrls: ['./poke-catalog-page.page.css']
})
// Here we're exporting the PokeCatalogPage so that we can import it elsewhere.
export class PokeCatalogPage implements OnInit {

  pokemons: any[] = [];

  constructor(
    private pokeapiService: PokeapiService, 
    public userService: UserService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.pokeapiService.getAllPokemon().subscribe(data => {
      this.pokemons = data.results;
    });
  }

  getImageUrl(pokemonUrl: string): string {
    const id = pokemonUrl.split('/').filter(part => !!part).pop(); // Extracts the ID from the URL
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  // This method is called when the user wants to add a Pokémon
  addPokemon(pokemonName: string): void {
    const user = this.userService.user;

    if (user) {
      // Create a copy of the current user's Pokémon list
      const updatedPokemonList = [...user.pokemon];

      // Add the new Pokémon to the copied list
      updatedPokemonList.push(pokemonName);

      // Use the updated list to send to the backend
      const updatedUser = {
        ...user,
        pokemon: updatedPokemonList
      };

      // Now update this user in the backend
      this.userService.updateUser(updatedUser).subscribe(() => {
        // Only update the frontend state if the backend update is successful
        this.userService.user = updatedUser;  // Important to update the service's state as well

        // Update session storage
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        /*
        // You can also update the local user's Pokémon list if needed
        this.userPokemon = updatedPokemonList;*/
      },
      error => {
        // Error callback
        console.error("Error updating Pokémon: ", error);
        // Maybe show an error message to the user
      });
    }
  }
}