import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Comment } from "../comment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentService {

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private eh: ErrorHandlingService
  ) { }

  /** GET comments from the server */
  getComments(gymId: number): Observable<Comment[]> {
    let url = `https://snf-782488.vm.okeanos.grnet.gr/api/comments/${gymId}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        tap(comments => this.message.add(`fetched comments`)),
        catchError(this.eh.handleError('getComments', []))
      );
  }

  /** POST: add a new comment to the server */
  addComment(comment: Comment): Observable<Comment> {
    let url = `https://snf-782488.vm.okeanos.grnet.gr/api/comments/${comment.gym}`;
    return this.http.post<Comment>(url, comment, httpOptions).pipe(
      tap((comment: Comment) => this.message.add(`added comment w/ id=${comment.id}`)),
      catchError(this.eh.handleError<Comment>('addComment'))
    );
  }


}
