import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder) {
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


}
