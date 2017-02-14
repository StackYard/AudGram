import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import {ComponentService} from "../component.service";
import {UserService} from "../user.service";
import {AngularFire} from "angularfire2";
import {storage} from "firebase";
export declare var Materialize: any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Input() uid;
  btn = false;
  @Input() dp;
  file;ext;ref;loader;
  @Input() key;
  constructor( private af: AngularFire, private cs: ComponentService, private us:UserService) {
    console.log(this.uid, this.key, this.dp)
  }
  onFileChange(f){
    this.btn = true;
    this.file = f.files[0];
    this.ext = this.file.name.split('.');
    this.ext = this.ext[this.ext.length-1];
    let date= new Date();
    let time = date.getTime();
    this.ref = storage().ref(this.uid +'/posts/'+this.uid+"_"+time+'.'+this.ext);
  }
  onPost(ta,f,fp){
    this.btn = false;
    this.loader = true;
    let date = new Date();
    
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

            this.af.database.list('/posts/'+this.uid).push({text: ta.value, audio: url, time: date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()}).then(()=>{
              this.loader = false;
              ta.value = "";
              ta.style.padding = '0';
              this.file = "";
              fp.value = "";
            });
          })
        }
      )
    }
    else {
      this.af.database.list('/posts/'+this.uid).push({text: ta.value}).then(()=>{
        this.loader = false;
        ta.value = "";
        ta.style.height = '20.6px';
        this.file = "";
      });
    }
  }
  ngOnInit() {

  }

}
