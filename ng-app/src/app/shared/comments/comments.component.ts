import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'lgc-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit {
  @Input() postId: any;
  @Input() comments: any;
  newComment: string;
  date = new Date();
  displayDate = this.date.getFullYear() + '-' + this.date.getMonth() + 1 + '-' + this.date.getDate();

  constructor(private apiS: ApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  addComment(newCommentTxt): void {
    this.displayDate = this.date.getFullYear() + '-' + this.date.getMonth() + 1 + '-' + this.date.getDate();

    const newComment = {
      content: newCommentTxt,
      date: this.displayDate,
      parent_id: null,
      user: 'Guest  '
    };
    this.apiS.addApiComments(this.postId, newComment).subscribe((res) => {
      this.comments.unshift(res);
      this.cd.detectChanges();
    });
  }

  editComment(comment): void {
    comment.content = comment.newContent;
    comment.edit = false;
    comment.newContent = null;
    this.apiS.editApiComment(comment.id, comment).subscribe((res) => {

    }, (err) => {
      comment.edit = true;

    });
  }

  getComments(comment): void {
    this.apiS.getApiComments(this.postId).subscribe((res) => {
      console.log(res)
    })
  }

  editCommentTxt(comment): void {
    comment.edit = !comment.edit;
    console.log(comment.id)
    this.comments.map((com) => {
      if (com.id !== comment.id) {
        com.edit = false;
      }
    })
    this.cd.detectChanges()
  }
}
