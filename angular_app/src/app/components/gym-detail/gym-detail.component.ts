import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from "../../services/data.service";

import { Gym } from "../../gym";

@Component({
  selector: 'app-gym-detail',
  templateUrl: './gym-detail.component.html',
  styleUrls: ['./gym-detail.component.css']
})
export class GymDetailComponent implements OnInit {

  @Input()
  gym: Gym;



  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getGym();
  }

  getGym(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getGym(id).subscribe(gym => this.gym = gym);
  }

}
