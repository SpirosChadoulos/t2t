import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GymComponent} from "./components/gym/gym.component";
import {LoginComponent} from "./components/login/login.component";
import { GymDetailComponent } from "./components/gym-detail/gym-detail.component";
import {SearchComponent} from "./components/search/search.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'search', component: GymComponent },
  { path: 'detail/:id', component: GymDetailComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
