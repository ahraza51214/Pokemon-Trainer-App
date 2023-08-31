import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { map, Observable, switchMap, of, mapTo, tap } from 'rxjs';
import { map, Observable, switchMap, of} from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';


const { apiKey, apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //Login if user exist or create new user if function checkuser returns empty array
  public login(username: string): Observable<User> {
    return this.checkUsername(username)
    .pipe(
      switchMap((userResponse: User | undefined) => {
        if (userResponse === undefined) {
          return this.createUser(username);
        }
      return of(userResponse);
      })
    )
  }

  //Check for if username exists
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUrl}?username=${username}`)
    .pipe(map((response: User[]) => response.pop()))
  }

  //Create new user
  private createUser(username: string): Observable<User> {
    const user = {
      username: username,
      pokemon: [],
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })
    return this.http.post<User>(apiUrl, user, {headers: headers})
  }

}