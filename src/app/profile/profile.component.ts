import { FirebaseObjectObservable } from 'angularfire2/database';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {ComponentService} from "../component.service";
import {storage} from 'firebase'
import {UserService} from "../user.service";
import "rxjs/add/operator/map";
declare var Materialize;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  uid;
  btn = false;
  user: any = {dp: '', dob: '', fname:'', lname:'', gender: '', email: '', $key: '', uid:''};
  // user;
  file;ext;ref;loader;key;
  posts: FirebaseListObservable<any[]>;
  constructor(private ar: ActivatedRoute, private af: AngularFire, private cs: ComponentService, private us:UserService) {
    this.cs.updateFooter(false);
    

  }
  ngOnInit() {   
        this.ar.params.subscribe((p)=>{
      this.uid = p['uid'];
      this.af.database.list('/users',{
        query: {
          orderByChild: 'uid',
          equalTo: p['uid'],
          limitToFirst: 1
        }
      }).subscribe((v)=>{
        this.user = v[0];
        this.key = this.user.$key;
        // console.log(this.user.$exists())
      });
      this.af.database.list(`/posts/${this.uid}`)
        .map((a)=> a.reverse())
        .subscribe(a=> {this.posts = a;});
    });

  }
  ngOnDestroy(){
  }
}
