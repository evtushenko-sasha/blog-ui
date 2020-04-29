import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Comment} from '../model/Comment';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getCommentsByPostId(postId: number, page: number, size: number, sort: string, sortType: string): Observable<Comment[]> {
    let params = new HttpParams()
      .set('postId', String(postId))
      .set('page', String(page))
      .set('size', String(size));

    if (sort != null) {
      params = params.set('sort', sort);
    }

    if (sortType != null) {
      params = params.set('sortType', sortType);
    }
    console.log('get comment');
    return this.httpClient.get<Comment[]>(`${environment.commentsAPI}`, {params});

  }

  addComment(comment: Comment): Promise<any> {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${environment.commentsAPI}`, comment, {headers: httpHeaders})
      .toPromise();
  }

  getSortTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.commentsAPI}/sort-types`);
  }

  deleteComment(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.commentsAPI}/${id}`);
  }
}
