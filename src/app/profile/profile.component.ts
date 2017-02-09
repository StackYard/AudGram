import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  uid;
  constructor(private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.params.subscribe((p)=>{
      this.uid = p['uid'];
    });

  }
  ngOnDestroy(){

  }

}
