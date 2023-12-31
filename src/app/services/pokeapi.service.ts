import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  getAllPokemon(limit: number, offset: number): Observable<any> {
    return this.http.get(`${environment.pokeApiUrl}?limit=${limit}&offset=${offset}`);
  }
  
}