import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { ErrorHandlingService } from '../../services/errorhandling.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message: string;

  constructor(
    private auth: AuthService,
    private eh: ErrorHandlingService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(username, email, password1, password2) {
    if(password1==password2){
      this.auth.register(username, email, password1)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/']);
        }
      });
    } else {
      document.getElementById("password1").style.borderColor = "#E34234";
      document.getElementById("password2").style.borderColor = "#E34234";
    }
  }

}
