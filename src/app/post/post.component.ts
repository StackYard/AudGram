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
  @Input() post;
  @Input() fname;
  @Input() lname;
  @Input() uid;
  @Input() dp;
  constructor() { }

  ngOnInit() {
  }

}
