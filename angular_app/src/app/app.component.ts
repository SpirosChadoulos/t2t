import { Component , OnInit} from '@angular/core';

import { AuthService } from "./services/auth.service";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';



import { ErrorHandlingService } from "./services/errorhandling.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private auth: AuthService, private http: HttpClient, private eh: ErrorHandlingService, private _router:Router){

  }


  ngOnInit(){

    // this._router.navigate([''], {skipLocationChange: true})
    //   .then(() => { this._router.navigate(['search']); });

    //Keep the user logged in when the page gets refreshed.
    if(localStorage.getItem('t2t-jwt-token')!=null){
      this.auth.isLoggedIn = true;
    }

    //Check if the token has expired.
    this.check().subscribe();


  }

  check(): Observable<boolean>{
    var token = new Token(localStorage.getItem('t2t-jwt-token'));
    return this.http.post('https://snf-782488.vm.okeanos.grnet.gr/api/api-token-verify/', token, this.httpOptions).pipe(
      map(
        results => {
          console.log("Token is still valid");
          return true;
        }
      ),
      // If the token has expired logout the user.
      catchError(this.auth.errorLogout<boolean>())
    );

  }

}

class Token {

  constructor(public token: string) {

  }
}
