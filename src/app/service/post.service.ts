import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {FullPostDto} from '../model/FullPostDto';
import {ShortPostDto} from '../model/ShortPostDto';
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

  getPostsByParams(page: number, size: number, sort: string, dateFrom: Date, dateTo: Date,
                   sortType: string, searchValue: string, tagIds: number[]): Observable<ShortPostDto[]> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    if (sort != null) {
      params = params.set('sort', sort);
    }

    if (sortType != null) {
      params = params.set('sortType', sortType);
    }
    if (dateFrom != null) {
      params = params.set('dateFrom', dateFrom.toString());
    }
    if (dateTo != null) {
      params = params.set('dateTo', dateTo.toString());
    }
    if (searchValue != null) {
      params = params.set('searchValue', searchValue);
    }
    if (tagIds != null) {
      params = params.set('tagIds', tagIds.toString());
    }
    return this.httpClient.get<ShortPostDto[]>(`${environment.postsAPI}`, {params});
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

  getUserBookmarksPostsByParams(): Observable<ShortPostDto[]> {
    return undefined;
  }

  getAvailableSorts(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.postsAPI}/sort-types`);
  }
}
