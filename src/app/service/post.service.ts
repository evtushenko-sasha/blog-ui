import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {FullPostDto} from '../model/FullPostDto';
import {ShortPostDto} from '../model/ShortPostDto';
import {SortType} from '../model/SortType';
import {CacheService} from 'ionic-cache';
import {ToastController} from '@ionic/angular';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private subscription: Subscription;

  constructor(private httpClient: HttpClient,
              private cache: CacheService,
              private toastController: ToastController) {
    this.subscription = new Subscription();
  }

  getPostById(postId: number): Observable<FullPostDto> {
    return this.httpClient.get<FullPostDto>(`${environment.postsAPI}/${postId}`);
  }

  getPostsByParams(page: number, size: number, sort: string,
                   sortType: SortType, searchValue: string, tagIds: number[]): Observable<ShortPostDto[]> {
    return this.httpClient.get<ShortPostDto[]>(`${environment.postsAPI}?page=${page}
                                        &size=${size}&sort=${sort}&sortType=${sortType}&searchValue=${searchValue}&tagsIds=${tagIds}`);
  }

  getPost(): Observable<ShortPostDto[]> {
    const request = this.httpClient.get<ShortPostDto[]>(`${environment.postsAPI}`)
      .pipe(
        retry(1),
        catchError(this.handlerError)
      );
    return this.cache.loadFromObservable(environment.postsAPI, request);
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
    const toastController = new ToastController();
    const toast = await toastController.create({
      message: errorMessage,
      duration: 2000,
      color: 'dark'
    });
    await toast.present();
  }

}
