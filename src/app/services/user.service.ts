import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {StorageKeys} from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import {StorageUtil} from '../utils/storage.util';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave(StorageKeys.User, user!);
    this._user = user;
  }

  constructor(private http: HttpClient) {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': environment.apiKey
    });

    return this.http.put<User>(`${environment.apiUrl}/${user.id}`, user, { headers: headers });
  }

  isLoggedIn(): boolean {
    return !!StorageUtil.storageRead(StorageKeys.User);
  }

  //Pokemon cellection api between trainer page and poke catalog page
  addPokemon(pokemonName: string): Observable<User> {
    if (!this._user) {
      // Handle error or throw an error
      throw new Error('User not found');
    }

    // Check if Pokémon is already collected
    if (this._user.pokemon.includes(pokemonName)) {
      // Handle error or simply return the user observable without API call
      return of(this._user);
    }

    // Add the Pokémon to the user's collection
    this._user.pokemon.push(pokemonName);

    // Update the user using the API
    return this.updateUser(this._user);
  }


  isCollected(pokemonName: string): boolean {
    if (!this._user) {
      return false;
    }
    return this._user.pokemon.includes(pokemonName);
  }

  
  removePokemon(pokemonName: string): Observable<User> {
    if (!this._user) {
      // Handle error or throw an error
      throw new Error('User not found');
    }
  
    // Remove the Pokémon from the user's collection
    this._user.pokemon = this._user.pokemon.filter(p => p !== pokemonName);
  
    // Update the user using the API
    return this.updateUser(this._user);
  }
  addToCollection(pokemonName: string): Observable<User> {
    if (!this._user){
      // Handle error or throw an error
      throw new Error('User not found');
    }

    // Check if Pokémon is already collected
    if (this._user.pokemon.includes(pokemonName)) {
      // Handle error or simply return the user observable without API call
      return of(this._user);
    };  // Or some error handling

    // Add the Pokémon to the user's collection locally
    this._user.pokemon.push(pokemonName);

    // Update the user's data on the backend
    return this.updateUser(this._user).pipe(
    tap(updatedUser => {
      // Update the local user data with the updated user data from the API
      this._user = updatedUser;
    })
  )}

  

}
