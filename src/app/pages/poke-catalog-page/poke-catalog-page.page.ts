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

  addToCollection(pokemon: any): void {
    this.userService.addPokemon(pokemon.name).subscribe(updatedUser => {
      // Handle after adding to collection
      this.cdRef.detectChanges();
    });
  }

  
}
