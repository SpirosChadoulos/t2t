import { Component, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(private auth: AuthService, private modalService: NgbModal) {}

  // closeResult: string;
  //
  // open(content:any) {
  //   this.modalService.open(content)
  // }




}

