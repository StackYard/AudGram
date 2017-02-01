import {Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
/**
 * Created by devilu on 1/31/17.
 */
export const routes: Routes = [
  {path: 'index', component: WelcomeComponent},
  {path: '', redirectTo: 'index', pathMatch: 'full'}
  ];
