import { MaterializeAction } from 'angular2-materialize/dist';
import { UserService } from '../user.service';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import "rxjs/add/operator/map";
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
  editMode = false;
  audio ;
  playing = false;
  isLiked;
  likeLength;
  comment = false;
  isFav = false;
  comments;
  loader= false;
  sc;
  @Input() singlePost;
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
    .then(()=>{
      console.log("then");
      if(this.uid != this.us.getUid()){
        this.af.database.list(`/notifications/${this.uid}`).push({type: 'Like', by : this.us.getUid(), post: this.post.$key, state: 'unread'})  ;        
      }
    })
  }
  onUnLike(){
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).remove(this.isLiked.$key);
  }
  onCommentButton(){
      this.comment = true;
    if(!this.singlePost){
          this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`, {
      query:{
        limitToLast : 3
      }
    })
    .subscribe((v)=>{
      this.comments = v;
      console.log(v);
      this.comments.reverse();
    });
  }
  // else{

  //       this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`)
  //   .subscribe((v)=>{
  //     this.comments = v;
  //     console.log(v);
  //     this.comments.reverse();
  //   });
  // }

    
  }
  onComment(comment){
    let date = new Date;
    if(comment.value){
    this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).push({uid: this.us.getUid(), dp: this.us.getUser().dp, name: this.us.getUser().fname+" "+this.us.getUser().lname, comment: comment.value, time: date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()})
    .then(()=>{
      comment.value = "";
    })
    }
  }
  onCommentDelete(key){
    this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).remove(key)
  }
  // onEditMode(){
  //   this.editMode = true;
  // }
  //   onEditModeDisable(){
  //   this.editMode = false;
  // }
  onRemovePost(key){
    this.af.database.list(`/posts/${this.uid}`).remove(key);
    this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).remove()
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).remove()
    
  }
  // onUpdate(key,ta){
  //   console.log(ta);
  //   // this.af.database.list(`/posts/${this.uid}`).update(key,{text: ta.value})
  // }
  ngOnInit() {
    console.log(this.post)
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
    });
    if(this.singlePost){
      this.comment = true;
      
              this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`)
    .subscribe((v)=>{
      this.comments = v;
      console.log(v);
      this.comments.reverse();
    })
  }
  }
}
