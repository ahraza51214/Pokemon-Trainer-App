import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {StorageKeys} from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import {StorageUtil} from '../utils/storage.util';
import { Observable } from 'rxjs';
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


}
