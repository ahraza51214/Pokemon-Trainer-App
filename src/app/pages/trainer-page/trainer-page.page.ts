import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// This page is for the trainer's Pokémon collection
@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})

// This class implements the trainer's Pokémon collection
export class TrainerPage implements OnInit {
  public userPokemon: any[] = [];

  // This constructor injects the UserService into this class
  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {}

  // This method is called when the page is loaded
  ngOnInit(): void {
    // Get the user's Pokémon collection from the UserService.
    const user = this.userService.user;
    // If the user has a Pokémon collection, then add each Pokémon's name to the userPokemon array.
    if(user && user.pokemon) {
      user.pokemon.forEach((pokemonName: string) => {
        this.http.get<any>(`${environment.pokeApiUrl}${pokemonName}`)
        // This is a callback function that will be called when the HTTP request completes
        .subscribe(pokemonData => {
          // Add the Pokémon's name and image to the userPokemon array.
          // This is the data that will be displayed in the Pokémon collection.
          // The data is in the format:
          // {
          //   name: <"Pokeman name">,
          //   imageUrl: "https://xxxxxxxxxxxxxxxxx/${id}.png"
          // }
          // The name and image are extracted from the pokemonData object.
          // The name is the Pokémon's name, and the image is its image URL.
          // The image URL is obtained from the pokemonData object.
          // The image URL is the URL of the image that is displayed in the Pokémon collection.
          console.log(pokemonData);
          const id = pokemonData.id;
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
  // This method is called when the user clicks the "Remove" button
  removePokemon(index: number): void {
    const user = this.userService.user;

    if (user) {
      // Remove the Pokémon from the user's collection.
      user.pokemon.splice(index, 1);

      // Now update this user in the backend (i.e., save the updated user data).
      // This can be done using a service call to update the user in the database.
      // Here's a hypothetical updateUserService - we'd have to implement this:
      this.userService.updateUser(user).subscribe(() => {
        // Refresh the displayed Pokémon list.
        this.userPokemon.splice(index, 1);
      });
    }
  }*/
  removePokemon(index: number): void {
    const user = this.userService.user;
  
    if (user) {
      // Create a copy of the current user's Pokémon list
      const updatedPokemonList = [...user.pokemon];
  
      // Remove the Pokémon from the copied list
      updatedPokemonList.splice(index, 1);
  
      // Use the updated list to send to the backend
      const updatedUser = {
        ...user,
        pokemon: updatedPokemonList
      };
  
      // Now update this user in the backend
      this.userService.updateUser(updatedUser).subscribe(() => {
        // Only update the frontend state if the backend update is successful
        this.userService.user = updatedUser;  // Important to update the service's state as well
        this.userPokemon.splice(index, 1);
      },
      error => {
        // Error callback
        console.error("Error updating Pokémon: ", error);
        // Maybe show an error message to the user
      });
    }
  }
  
}
