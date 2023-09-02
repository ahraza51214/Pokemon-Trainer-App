/*import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "../models/user.model";
import { UserService } from "./user.service";
import { environment } from 'src/environments/environment';

const { apiKey, apiUrl } = environment;
@Injectable({
    providedIn: 'root',
  })
  export class CollectService {
    constructor(
      private http: HttpClient,
      private readonly userService: UserService
    ) {}
  
public removeFromCollected(pokemonName: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error('removeFromCollected: There is no user');
    }
    const user: User = this.userService.user;

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    });

    

    console.log("Sending removal http!");

    return this.http
      .patch<User>(
        `${apiUrl}/${user.id}`,
        {
          pokemon: [...user.pokemon],
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
          console.log("Pokemon removal succeeded");
        })
      );
  }
  }*/
