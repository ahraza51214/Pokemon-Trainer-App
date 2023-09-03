import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  //private readonly BASE_URL: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getAllPokemon(limit: number = 150): Observable<any> {
    return this.http.get(`${environment.pokeApiUrl}?limit=${limit}`);
  }

  
}
