import {Component, OnInit, trigger, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {storage} from  'firebase';
declare let Materialize:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  btn = true;
  user;

  constructor(fb: FormBuilder, private af: AngularFire, private router:Router, private us:UserService) {
    this.form = fb.group({
      'fname': [''],
      'lname': [''],
      'email': [''],
      'password': [''],
      'dob': [''],
      'gender':['']
    })
  }

  ngOnInit() {
    // let Storage = storage();
    // let storageRef = Storage.ref();
    // let imgRef = storageRef.child('w.jpg');
    // imgRef.getDownloadURL().then((url)=>{
    //   console.log(url)
    // })
    //   .catch((err)=>{
    //   console.log(err)
    //   })
    // // this.af.auth.login({email:'haziz@gmail.com', password: '123456'}).then(d=>{
    //   this.us.updateUid(d.uid);
    //   this.us.login(d.uid,'l');
    //   // console.log(this.us.getkey())
    //   // console.log(this.us.getkey())
    //
    // // })
    // this.af.auth.subscribe((d)=>{
    //   console.log(d);
    //   this.us.login(d.uid, 'l');
    // });


  }

  onRegister(x){
    if(!x.fname){
           Materialize.toast("Error: Please Enter Your First Name", 1000, 'red');

           return;
    }
    if(!x.lname){
           Materialize.toast("Error: Please Enter Your Last Name", 1000, 'red');
           return;
    }
    if(!x.gender){
      Materialize.toast("Error: Please Select Your Gender", 1000, 'red');
      return;
    }
    if(!x.dob){
      Materialize.toast("Error: Please Enter Your Birthdate", 1000, 'red');
      return;
    }
    this.btn = false;
    this.af.auth.createUser({email:x.email, password: x.password}).then(()=>{
      this.af.auth.login({email:x.email, password: x.password}).then((d)=>{
       this.af.database.list('/users').push({email: x.email, dob:x.dob,fname:x.fname,lname:x.lname,gender:x.gender, uid: d.uid});
        this.us.login(d.uid,'/index/UploadProfilePicture');
      })
    })
      .catch(err=>{
        this.btn = true;
        Materialize.toast(err, 1000, 'red');
      })

  }
}
