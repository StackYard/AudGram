import { MaterializeAction, MaterializeDirective } from 'angular2-materialize/dist';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserService } from '../user.service';
import { Component, EventEmitter, OnChanges, OnInit } from '@angular/core';
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
    console.log(this.us.getUid());      
    
    this.af.database.list(`/notifications/${this.us.getUid()}`)
    .subscribe(v=>{
      this.listOfNoti = v.reverse();
      console.log(this.notifications);
      v.filter((v)=>{
        console.log(v, "asd");
        this.notifications = 0;
        return v.state == 'unread';
      })
      .map((v)=>{
        ++this.notifications;
      })
      // for(let i = 0; i <= this.listOfNoti.length; i++){
      //   console.log(this.listOfNoti[i].state);
      // }
    //       for(let i = 0; i <= this.listOfNoti.length; i++){
    //     console.log('  0loop')
      
    //   if(this.listOfNoti[i].state == 'unread'){
    //     this.notifications++;
    //     console.log('1loop')
    //   }
    // }
    })
  }
  ngOnChanges(){
        console.log('change')
    


  }

}
