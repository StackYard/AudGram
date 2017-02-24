import { MaterializeAction, MaterializeDirective } from 'angular2-materialize/dist';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserService } from '../user.service';
import { Component, EventEmitter, OnChanges, OnInit } from '@angular/core';
declare let Materialize: any;
@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit, OnChanges {
  fr = new EventEmitter<string|MaterializeAction>();
  msg = new EventEmitter<string|MaterializeAction>();
  noti = new EventEmitter<string|MaterializeAction>();
  searchBar = false;
  // requests = 0;
  notifications = 0;
  messages = 0;
  listOfNoti: any[];
  load = false;
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
    //         let b = false;
    // setTimeout(()=>{b = true; console.log("run")}, 4000);

    //       function bool(){
    //       console.log("boool")
            
    //     if(b){
    //       console.log("b agaya")
    //     }
    //     else{
    //       console.log("else")
    //       bool();

    //     }
    //   }
    //   bool()   
    
    this.af.database.list(`/notifications/${this.us.getUid()}`)
    .subscribe(v=>{
        this.notifications = 0;
      
      this.listOfNoti = v.reverse();
      if(this.listOfNoti[0] && this.load){
        if(this.listOfNoti[0].state === 'unread'){
        Materialize.toast('<span class="black-text">'+JSON.stringify(this.listOfNoti[0])+'</span>', 5000, 'white')        
        }
      }
      this.load = true;
      
      v.filter((v)=>{
        return v.state == 'unread';
      })
      .map((v)=>{
        ++this.notifications;
      })
    })
  }
  ngOnChanges(){
    


  }

}
