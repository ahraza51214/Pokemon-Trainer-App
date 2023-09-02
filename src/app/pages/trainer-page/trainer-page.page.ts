import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

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
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.userService.user;

    if (user && user.pokemon) {
        // Prepare an array of Observables for each Pokémon's details
        const observables = user.pokemon.map((pokemonName: string) => {
            return this.http.get<any>(`${environment.pokeApiUrl}${pokemonName}`);
        });

        // Use forkJoin to execute all observables
        forkJoin(observables).subscribe(pokemonDataArray => {
            this.userPokemon = pokemonDataArray.map((pokemonData, index) => {
                return {
                    name: user.pokemon[index],
                    imageUrl: pokemonData.sprites.front_default
                };
            });
        });
        this.cdRef.detectChanges();
    }
  }
  
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
