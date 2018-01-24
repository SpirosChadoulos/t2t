import { Component, OnInit, Input} from '@angular/core';
import { DataService } from  '../../services/data.service';
import {Gym} from "../../gym";
import { Observable } from 'rxjs/Observable';
import { SearchComponent } from "../search/search.component";
import { Subject }    from 'rxjs/Subject';
import {switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})
export class GymComponent extends SearchComponent implements OnInit {

  @Input()
  gyms:Gym[];

  @Input() public name:string;
  @Input() public city:string;
  @Input() public spa:boolean;
  @Input() public trx:boolean;
  @Input() public crossfit:boolean;
  @Input() public yoga:boolean;
  @Input() public pilates:boolean;
  @Input() public zumba:boolean;
  @Input() public women_only:boolean;
  @Input() public pool:boolean;
  @Input() public sauna:boolean;
  @Input() public parking:boolean;



  constructor(private dtService:DataService, private rt:Router) {
    super(dtService,rt);
  }

  ngOnInit() {

    const name = super.getName();
    const city = super.getCity();
    const spa = super.getSpa();
    const trx = super.getTrx();
    const crossfit = super.getCrossfit();
    const yoga = super.getYoga();
    const pilates = super.getPilates();
    const zumba = super.getZumba();
    const women_only = super.getWomen();
    const pool = super.getPool();
    const sauna = super.getSauna();
    const parking = super.getParking();

    this.dtService.getGyms(name, city, spa, trx, crossfit, yoga, pilates, zumba, women_only, pool, sauna, parking).subscribe(gyms => this.gyms = gyms);

  }

}

