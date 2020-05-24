import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ShortPostDto} from '../model/ShortPostDto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {retry} from 'rxjs/operators';
import {CacheService} from 'ionic-cache';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnInit {

  /*TODO: implement with storage, load data after user login*/
  private userPostsBookmarks: Observable<number[]>;

  constructor(private httpClient: HttpClient,
              private cache: CacheService,
              private toastController: ToastController) {
    this.userPostsBookmarks = new Observable<number[]>();
    this.getUserBookmarks().subscribe(data => {
      console.log(data);
      this.userPostsBookmarks = new Observable<number[]>(subscriber => subscriber.next(data));
    });
  }

  async ngOnInit() {
  }

  /*TODO: find more clear solution*/
  containsInUserPostBookmarks(postId: number): Observable<boolean> {
    let bookmarked: Observable<boolean>;
    bookmarked = new Observable<boolean>(subscriber => {
      this.userPostsBookmarks.subscribe(data => {
        subscriber.next(data.includes(postId));
      });
    });
    return bookmarked;
  }

  async addPostToBookmarks(postId: number) {

    const request = this.httpClient.post(`${environment.bookmarkAPI}/posts/${postId}`, null).pipe(
      retry(1),
    );
    this.userPostsBookmarks.subscribe(data => {
      data.push(postId);
    });

    request.subscribe(data => {
      this.showToast('Added to bookmarks');
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'dark'
    });
    await toast.present();
  }

  getUserBookmarks(): Observable<number[]> {
    console.log('get bookmarks');
    return this.httpClient.get<number[]>(`${environment.bookmarkAPI}/post-ids`);
  }

  getBookmarksByParams(page: number, size: number, sort: string, sortType: string): Observable<ShortPostDto[]> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    if (sort != null) {
      params = params.set('sort', sort);
    }

    if (sortType != null) {
      params = params.set('sortType', sortType);
    }

    return  this.httpClient.get<ShortPostDto[]>(`${environment.bookmarkAPI}/posts`, {params}).pipe(
      retry(1)
    );
    // return this.cache.loadFromObservable(environment.bookmarkAPI + page + size + sort, request);
  }

  async handlerError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Service is unavailable. Please wait.`;
    }
    this.showToast(errorMessage);
  }

  deleteFromBookmarks(postId: number) {
    const httpHeaders = new HttpHeaders();
    const request = this.httpClient.delete(`${environment.bookmarkAPI}/posts/${postId}`, {headers: httpHeaders}).pipe(
      retry(1),
    );

    this.userPostsBookmarks.subscribe(data => {
      delete data[data.indexOf(postId)];
    });

    request.subscribe(data => {
      this.showToast('Deleted from bookmarks');
    });
  }
}
