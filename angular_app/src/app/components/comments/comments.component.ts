import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Comment } from "../../comment";
import { CommentService } from "../../services/comment.service";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[];
  comment: Comment;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let gymId = +params.get('id');
        this.comment = this.newComment(gymId);
        return this.commentService.getComments(+params.get('id'))
      }).subscribe(comments => this.comments = comments);
  }

  newComment(gymId: number) : Comment {
    var comment = new Comment();
    comment.gym = gymId;
    comment.content = '';
    // comment.user = this.auth.userobj.id;
    // comment.username = this.auth.userobj.username;
    // missing attributes
    return comment;
  }

  onSubmit() : void {
    this.commentService.addComment(this.comment)
      .subscribe(comment => {
        this.comments.unshift(comment);
        this.comment = this.newComment(comment.gym);
      });
  }

}
