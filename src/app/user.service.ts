import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Router} from "@angular/router";

@Injectable()
export class UserService {
user;
uid;
key;
  constructor(private af:AngularFire, private router:Router) {

  }
  getUid(){
    return this.uid;
  }
  updateUid(v){
    this.uid = v;
  }
  getUser(){
    return this.user;
  }
  updateKey(x){
    this.key = x;
  }
  login(u,t){

    // this.af.database.object('uid/'+u).subscribe((v)=>{
    //   this.key = v.key;
    //   this.af.database.object('users/'+this.key).subscribe((val)=>{
    //     this.user = val;
    //     console.log(this.key);
    //     console.log(this.user);
    //     console.log(this.uid);
    //     if(t == 's'){
    //       this.router.navigate(['/index/UploadProfilePicture']);
    //     }
    //     else {
    //
    //       this.router.navigate(['/index/profile/'+this.key]);
    //
    //     }
    //   })
    //
    // })
    this.af.database.list('/users',{
      query: {
        orderByChild: 'uid',
        equalTo: u,
        limitToFirst: 1
      }
    }).subscribe((v)=>{
      this.user = v[0];
      this.uid = this.user.uid;
      console.log(this.uid);
      console.log(this.user);
      if(t == 's'){
        this.router.navigate(['/index/UploadProfilePicture']);
      }
      else {

        this.router.navigate(['/index/profile/'+this.key]);

      }
    });
  }
  getkey(){
    return this.key;
  }
}
