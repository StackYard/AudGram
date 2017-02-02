import {Component, OnInit, trigger, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {AngularFire} from "angularfire2";
import {MaterializeAction} from "angular2-materialize";
import {Route, Router} from "@angular/router";
import {UserService} from "../user.service";
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


  }
  yearSelect(){
    setTimeout(()=>{
      let select = document.getElementsByClassName("picker__select--year browser-default")[0];
      let date = new Date();
      let year = date.getFullYear();
      // console.log(year, select);
      select.innerHTML = "";
      for(let i = 1980; i <= year; i++){
        select.innerHTML += `<option value="${i}" id="${i}">${i}</option>`
      }
      let y:any = document.getElementById(year.toString());
      y.selected="selected";

    }, 400)
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
       this.us.updateKey(this.af.database.list('/users')
         .push({email: x.email, dob:x.dob,fname:x.fname,lname:x.lname,gender:x.gender, uid: d.uid})
         .key);
        this.us.updateUid(d.uid);
        this.us.logIn();
        this.router.navigate(['/home']);
      })
    })
      .catch(err=>{
        this.btn = true;
        Materialize.toast(err, 1000, 'red');
      })

  }
}
