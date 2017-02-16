import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {
  searchBar = false;
  constructor(private us: UserService, private af: AngularFire, private router: Router) { }
  onSearchBarOpen(){
    this.searchBar = true;
  }
  onSearchBarClose(){
    this.searchBar = false;
  }
  onLogout(){
    this.af.auth.logout().then(() => {
      this.us.updateKey(undefined);
    this.us.updateUid(undefined);
    this.us.updateUser(undefined);
    this.router.navigate(['']);
    });

  }
  ngOnInit() {
    // $('.tooltipped').tooltip({delay: 50});
  }

}
