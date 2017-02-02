import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Injectable()
export class UserService {
user;
uid;
key;
  constructor(private af:AngularFire) {

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
  logIn(){
    this.af.database.object('users/'+this.key).subscribe((v)=>{
      this.user = v;
    })
  }
}
