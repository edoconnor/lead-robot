import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://portfolio-backend-2jmg.onrender.com/user';
  private api_key = environment.api_key;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('x-api-key', this.api_key);
    return this.http
      .get<User[]>(this.url, { headers })
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  saveUser(user: User): Observable<User> {
    const headers = new HttpHeaders().set('x-api-key', this.api_key);
    return this.http
      .post<User>(this.url, user, { headers })
      .pipe(catchError(this.handleError<User>('saveUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}