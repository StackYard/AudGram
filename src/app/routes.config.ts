import {Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {HomeComponent} from "./home/home.component";
/**
 * Created by devilu on 1/31/17.
 */
export const routes: Routes = [
  {path: 'index', component: WelcomeComponent},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
  ];
