import {Component, OnInit} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {ComponentService} from "./component.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  footer;
  constructor(private af: AngularFire, private router:Router, private us: UserService, private cs: ComponentService){
    this.footer = this.cs.getFooter();
    console.log(this.footer, this.cs.getFooter());
  }
  ngOnInit(){
    // this.af.auth.subscribe((d)=>{
    //   if(d){
    //     this.router.navigate(['/index/profile/'+d.uid]);
    //     this.us.updateUid(d.uid);
    //   }
    //   else {
    //     this.af.auth.login({email:'haziz@gmail.com', password: '123456'}).then(d=>{
    //       this.us.login(d.uid, '/index/profile/'+d.uid)
    //     });
    //
    //   }
    // })
  }
}
