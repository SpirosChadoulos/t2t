import { Component, OnInit, Input} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Gym } from '../../gym';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  @Input() public static city:string;
  @Input() public static gymname:string;
  @Input() public static spa:boolean;
  @Input() public static trx:boolean;
  @Input() public static crossfit:boolean;
  @Input() public static yoga:boolean;
  @Input() public static pilates:boolean;
  @Input() public static zumba:boolean;
  @Input() public static women_only:boolean;
  @Input() public static pool:boolean;
  @Input() public static sauna:boolean;
  @Input() public static parking:boolean;



  constructor(private dataService: DataService,private _router:Router) {
    // super(dataService);
  }

  gyms$: Observable<Gym[]>;
  private searchTerms = new Subject<string>();


  ngOnInit(): void {
    this.gyms$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),


      // switch to new search observable each time the term changes
      switchMap((term: string) => this.dataService.searchGyms(term)),
    );
    console.log(this.gyms$);

  }



// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  filter(name:string,city:string, spa:boolean, trx:boolean, crossfit:boolean, yoga:boolean, pilates:boolean, zumba:boolean, women_only:boolean, pool: boolean, sauna:boolean, parking:boolean): void {
    SearchComponent.gymname=name;
    SearchComponent.city=city;
    SearchComponent.spa=spa;
    SearchComponent.trx=trx;
    SearchComponent.crossfit=crossfit;
    SearchComponent.yoga=yoga;
    SearchComponent.pilates=pilates;
    SearchComponent.zumba=zumba;
    SearchComponent.women_only=women_only;
    SearchComponent.pool=pool;
    SearchComponent.sauna=sauna;
    SearchComponent.parking=parking;
  }



  public getName():string{
    return SearchComponent.gymname;
  }

  public getCity():string{
    return SearchComponent.city;
  }

  public getSpa():boolean{
    return SearchComponent.spa;
  }

  public getTrx():boolean{
    return SearchComponent.trx;
  }

  public getCrossfit():boolean{
    return SearchComponent.crossfit;
  }

  public getYoga():boolean{
    return SearchComponent.yoga;
  }

  public getPilates():boolean{
    return SearchComponent.pilates;
  }

  public getZumba():boolean{
    return SearchComponent.zumba;
  }

  public getWomen():boolean{
    return SearchComponent.women_only;
  }

  public getPool():boolean{
    return SearchComponent.pool;
  }

  public getSauna():boolean{
    return SearchComponent.sauna;
  }

  public getParking():boolean{
    return SearchComponent.parking;
  }
  reloadData(link:string){
    this._router.navigate([''], {skipLocationChange: true})
      .then(() => { this._router.navigate([link]); });
  }

}
