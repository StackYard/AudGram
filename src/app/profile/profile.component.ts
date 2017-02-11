import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFire} from "angularfire2";
import {ComponentService} from "../component.service";
import {storage} from 'firebase'
import {UserService} from "../user.service";
declare var Materialize;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  uid;
  btn = false;
  user = {dp: '', dob: '', fname:'', lname:'', gender: '', email: '', $key: '', uid:''};
  file;ext;ref;loader;key;
  constructor(private ar: ActivatedRoute, private af: AngularFire, private cs: ComponentService, private us:UserService) {
    this.cs.updateFooter(false);
    console.log(this.cs.getFooter());
    this.ar.params.subscribe((p)=>{
      // this.uid = p['uid'];
      this.af.database.list('/users',{
        query: {
          orderByChild: 'uid',
          equalTo: p['uid'],
          limitToFirst: 1
        }
      }).subscribe((v)=>{
        this.user = v[0];
        this.key = this.user.$key;
      });
    });
  }
  onInput(ta){
    if(ta.value){
    this.btn = true;
    }
    else {
      this.btn = false;
    }
  }
  onFileChange(f){
    this.btn = true;
    this.file = f.files[0];
    this.ext = this.file.name.split('.');
    this.ext = this.ext[this.ext.length-1];
    let date= new Date();
    let time = date.getTime();
    this.ref = storage().ref(this.user.uid +'/posts/'+this.user.uid+"_"+time+'.'+this.ext);
  }
  onPost(ta,f,fp){
    this.btn = false;
    this.loader = true;
    if(this.file){
      let task = this.ref.put(this.file);
      task.on('state_changed',
        ()=>{ //snap

        },
        (err)=>{
        this.btn = true;
        Materialize.toast(err,4000,'red')
        },
        ()=>{
        this.ref.getDownloadURL().then((url)=>{
          console.log(url);
          this.af.database.list('/users/'+this.key+'/posts').push({text: ta.value, audio: url}).then(()=>{
            this.loader = false;
            ta.value = "";
            this.file = "";
            fp.value = "";
          });
        })
        }
        )
    }
    else {
      this.af.database.list('/users/'+this.key+'/posts').push({text: ta.value}).then(()=>{
        this.loader = false;
        ta.value = "";
        this.file = "";
      });
    }
  }
  ngOnInit() {
    console.log(this.cs.getFooter());

  }
  ngOnDestroy(){
  }

}
