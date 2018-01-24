import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';




import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { ErrorHandlingService } from './errorhandling.service';
import { MessageService } from "./message.service";

import { User } from "../user";

import { Router } from '@angular/router';

import { of } from 'rxjs/observable/of';

class Credentials {
  constructor(public username: string, public password: string) {
  }
}

class RegisterCredentials {
  constructor(public username: string, public email: string, public password: string) {
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  username: string;
  // user: Observable<User>;
  // userobj: User;

  constructor(private http: HttpClient,private message: MessageService,
              private eh: ErrorHandlingService, private router: Router) { }

  login(username, password) : Observable<boolean> {
    const authUrl = `https://snf-782488.vm.okeanos.grnet.gr/api/api-token-auth/`;
    // const authUrl = `http://localhost:8000/api/api-token-auth/`;
    console.log(username);
    console.log(password);
    var credentials = new Credentials(username, password);
    console.log(credentials);
    return this.http.post(authUrl, credentials, httpOptions).pipe(
        map(results => {
          if (results['token']) {
            localStorage.setItem('t2t-jwt-token', results['token']);
            this.isLoggedIn = true;
            this.username = username;
            // this.user = this.newUser(results['token']);
            // this.user.subscribe(user => this.userobj = user);
            // // this.http2.get('https://snf-782488.vm.okeanos.grnet.gr/rest-auth/user/').map(result => result.json())
            // alert(this.userobj);
            this.message.add(`User ${username} logged in`);
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.eh.handleError<boolean>(`login username=${username}`,
          false))
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.message.add(`User ${this.username} logged out`);
    this.username = null;
    localStorage.removeItem('t2t-jwt-token');
  }

  register(username, email, password1) : Observable<boolean> {
    const authUrl = `https://snf-782488.vm.okeanos.grnet.gr/api/users/`;
    // const authUrl = `http://localhost:8000/api/api-token-auth/`;
    var credentials = new RegisterCredentials(username, email, password1);
    console.log(credentials);
    return this.http.post(authUrl, credentials, httpOptions).pipe(
      map(results => {
        this.login(username, password1)
          .subscribe(res => {
            if (res) {
              this.router.navigate(['/']);
            }
          });
        return true;
      }),
      catchError(this.eh.handleError<boolean>(`RRRRRRRip`,
        false))
    );
  }

  public errorLogout<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.logout();

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  // newUser(token: string) : Observable<User> {
  //
  //   return this.http.get('https://snf-782488.vm.okeanos.grnet.gr/rest-auth/user/').map(res => res.json());
  //
  //   // return this.http2.get('https://snf-782488.vm.okeanos.grnet.gr/rest-auth/user/').map(result => result.json().map(obj => new User(obj)));
  //
  // }




}
