import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Gym} from "../gym";

@Injectable()
export class DataService {

  constructor(private http:HttpClient) {
    console.log('Data service kappa connected...');
  }


  private gymsUrl = 'https://snf-782488.vm.okeanos.grnet.gr/api/gyms';
  // private gymsUrl = 'http://localhost:8000/api/gyms';

  // getGyms(){
  //   // return this.http.get('http://localhost:8000/api/gyms').map(res => res.json());
  //   return this.http.get('https://snf-782488.vm.okeanos.grnet.gr/api/gyms').map(res => res.json());
  // }

  getGyms(name:string, city:string, spa:boolean, trx:boolean, crossfit:boolean, yoga:boolean, pilates:boolean, zumba:boolean, women_only:boolean, pool: boolean, sauna:boolean, parking:boolean): Observable<Gym[]> {
    if (name == null){
      name = '';
    }
    if (city == null){
      city = '';
    }

    if (spa.valueOf() == true){
      var x = 'True'
    }
    var spa_url = `spa=${x}`
    if (spa == null || spa == false){
      spa_url = '';
    }

    if (trx.valueOf() == true){
      var x = 'True'
    }
    var trx_url = `trx=${x}`
    if (trx == null || trx == false){
      trx_url = '';
    }

    if (crossfit.valueOf() == true){
      var x = 'True'
    }
    var crossfit_url = `crossfit=${x}`
    if (crossfit == null || crossfit == false){
      crossfit_url = '';
    }

    if (yoga.valueOf() == true){
      var x = 'True'
    }
    var yoga_url = `yoga=${x}`
    if (yoga == null || yoga == false){
      yoga_url = '';
    }

    if (pilates.valueOf() == true){
      var x = 'True'
    }
    var pilates_url = `pilates=${x}`
    if (pilates == null || pilates == false){
      pilates_url = '';
    }

    if (zumba.valueOf() == true){
      var x = 'True'
    }
    var zumba_url = `zumba=${x}`
    if (zumba == null || zumba == false){
      zumba_url = '';
    }

    if (women_only.valueOf() == true){
      var x = 'True'
    }
    var women_only_url = `women_only=${x}`
    if (women_only == null || women_only == false){
      women_only_url = '';
    }

    if (pool.valueOf() == true){
      var x = 'True'
    }
    var pool_url = `pool=${x}`
    if (pool == null || pool == false){
      pool_url = '';
    }

    if (sauna.valueOf() == true){
      var x = 'True'
    }
    var sauna_url = `sauna=${x}`
    if (sauna == null || sauna == false){
      sauna_url = '';
    }

    if (parking.valueOf() == true){
      var x = 'True'
    }
    var parking_url = `parking=${x}`
    if (parking == null || parking == false){
      parking_url = '';
    }




    const url = `${this.gymsUrl}?name=${name}&city=${city}&${spa_url}&${trx_url}&${crossfit_url}&${yoga_url}&${pilates_url}&${zumba_url}&${women_only_url}&${pool_url}&${sauna_url}&${parking_url}`;
    return this.http.get<Gym[]>(url).pipe(
      tap(_ => this.log(`fetched gym name=${name}`)),
      catchError(this.handleError<Gym[]>(`getGyms name=${name}`))
    );
  }

  searchGyms(term: string): Observable<Gym[]> {

    if (!term.trim()) {
      // if not search term, return empty gym array.
      return of([]);
    }

    return this.http.get<Gym[]>(`https://snf-782488.vm.okeanos.grnet.gr/api/gyms/?name=${term}`).pipe(
      tap(_ => this.log(`found gyms matching "${term}"`)),
      catchError(this.handleError<Gym[]>('searchGyms', []))
    );
  }

  // getGym(id){
  //   //return this.http.get('http://localhost:8000/api/gyms').map(res => res.json());
  //   return this.http.get('https://snf-782488.vm.okeanos.grnet.gr/api/gyms/'+id).map(res => res.json());
  // }

  getGym(id: number): Observable<Gym> {
    const url = `${this.gymsUrl}/${id}`;
    return this.http.get<Gym>(url).pipe(
      tap(_ => this.log(`fetched gym id=${id}`)),
      catchError(this.handleError<Gym>(`getGym id=${id}`))
    );
  }



  searchCityGyms(term: string): Observable<Gym[]> {

    if (!term.trim()) {
      // if not search term, return empty gym array.
      return of([]);
    }

    return this.http.get<Gym[]>(`https://snf-782488.vm.okeanos.grnet.gr/api/gyms/?city=${term}`).pipe(
      tap(_ => this.log(`found gyms matching "${term}"`)),
      catchError(this.handleError<Gym[]>('searchCityGyms', []))
    );
  }

  private log(message: string): void {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
