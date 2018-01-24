import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { GymComponent } from './components/gym/gym.component';

import { DataService } from './services/data.service';
import { MessageService } from "./services/message.service";
import { ErrorHandlingService } from "./services/errorhandling.service";
import { AuthService } from "./services/auth.service";
import { CommentService} from "./services/comment.service";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { SearchComponent } from './components/search/search.component';

import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { MessagesComponent } from './components/messages/messages.component';
import { ModalComponent } from './components/modal/modal.component';
import { GymDetailComponent } from './components/gym-detail/gym-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { RegisterComponent } from './components/register/register.component';






@NgModule({
  declarations: [
    AppComponent,
    GymComponent,
    NavbarComponent,
    LoginComponent,
    SearchComponent,
    MessagesComponent,
    ModalComponent,
    GymDetailComponent,
    CommentsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [DataService,MessageService,ErrorHandlingService,AuthService,CommentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
