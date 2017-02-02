import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes.config";
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import {AngularFireModule} from "angularfire2";
import {firebaseConfig, authConfig} from "./firebase.config";
import {MaterializeDirective,MaterializeModule} from "angular2-materialize";
import { HomeComponent } from './home/home.component';
import {UserService} from "./user.service";
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    MaterializeModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
