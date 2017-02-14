import { UserService } from '../user.service';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from 'rxjs/Rx';
import {Component, OnInit, Input} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'replaceLineBreaks'})
export class ReplaceLineBreaks implements PipeTransform {
  transform(value: string): string {
    let newValue = value.replace(/\n/g, '<br/>');
    return `${newValue}`;
  }
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  user;
  @Input() post;
  @Input() fname;
  @Input() lname;
  @Input() uid;
  @Input() dp;
  audio ;
  playing = false;
  isLiked;
  likeLength;
  comment = false;
  constructor(private af:AngularFire, private us: UserService) {
    this.user = this.us.getUser();
  
  }
  onPlay(){
    this.audio.play();
    this.playing = true;
        this.audio.onended = ()=>{
    this.playing = false;
      
    }
  }
  onPause(){
    this.audio.pause();
    this.playing = false;    
  }
  onStop(){
    this.audio.pause();    
    this.audio.currentTime = 0;
    this.playing = false;    
    

  }
  onLike(){
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).push({name: this.user.fname + " " + this.user.lname, uid: this.user.uid})
  }
  onUnLike(){
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).remove(this.isLiked.$key);
  }
  onCommentButton(){
    this.comment = true;
  }
  onComment(comment){

    if(comment.value){
    this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).push({uid: this.us.getUid(), dp: this.us.getUser().dp, name: this.us.getUser().fname+" "+this.us.getUser().lname, comment: comment.value})
    .then(()=>{
      comment.value = "";
    })
    }
  }
  ngOnInit() {
    this.audio = new Audio(this.post.audio);
     this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`,{
       query:{
         orderByChild: 'uid',
         equalTo: this.us.getUid(),
         limitToFirst: 1
       }
     }).subscribe((v)=>{
       this.isLiked = v[0];
     });
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).subscribe((v)=>{
      this.likeLength = v.length;
    })
     console.log(this.post)
  }
}
