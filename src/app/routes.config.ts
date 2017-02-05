import {Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {HomeComponent} from "./home/home.component";
import {DpUploadComponent} from "./dp-upload/dp-upload.component";
import {ProfileComponent} from "./profile/profile.component";
/**
 * Created by devilu on 1/31/17.
 */
export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: ':ukey', redirectTo: 'index/profile/:ukey', pathMatch:'full'},
  {path: 'profile/:ukey', redirectTo: 'index/profile/:ukey', pathMatch:'full'},
  {path: 'index', component: HomeComponent, children:
    [
      {path:'UploadProfilePicture', component: DpUploadComponent},
      {path: 'profile/:ukey', component:ProfileComponent},
      {path: 'profile', redirectTo:'profile/:ukey', pathMatch:'full'},

    ]
  }
  ];
