import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }
  height(d){
    d.style.height = document.documentElement.clientHeight;
    console.log(document.documentElement.clientHeight)
  }
  ngOnInit() {

  }
}
