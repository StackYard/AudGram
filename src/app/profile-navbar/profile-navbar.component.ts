import { MaterializeAction, MaterializeDirective } from 'angular2-materialize/dist';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserService } from '../user.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {
  fr = new EventEmitter<string|MaterializeAction>();
  msg = new EventEmitter<string|MaterializeAction>();
  noti = new EventEmitter<string|MaterializeAction>();
  searchBar = false;
  // requests = 0;
  notifications = 0;
  messages = 0;
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
  // onFr(){
  //   this.fr.emit({action: 'modal', params: ['open']});
  // }
    onMsg(){
    this.msg.emit({action: 'modal', params: ['open']});
  }
    onNoti(){
    this.noti.emit({action: 'modal', params: ['open']});
  }
  ngOnInit() {
    // $('.tooltipped').tooltip({delay: 50});
    // console.log(this.us.getUser())
  }

}
