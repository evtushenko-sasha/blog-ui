import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ShortPostDto} from '../model/ShortPostDto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {retry} from 'rxjs/operators';
import {CacheService} from 'ionic-cache';
import {ToastController} from '@ionic/angular';
import {PostService} from "./post.service";

@Injectable({
    providedIn: 'root'
})
export class BookmarkService implements OnInit {

    /*TODO: implement with storage, load data after user login*/
    private userPostsBookmarks: Observable<number[]>;

    constructor(private httpClient: HttpClient,
                private cache: CacheService,
                private postService: PostService,
                private toastController: ToastController) {
        this.userPostsBookmarks = of([1, 3]);
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

        this.userPostsBookmarks.subscribe(data => {
            data.push(postId);
        });

        this.postService.addBookmark(postId);

        this.showToast('Added to bookmarks');
    }

    async showToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            color: 'dark'
        });
        await toast.present();
    }

    getBookmarksByParams(page: number, size: number, sort: string, sortType: string): Observable<ShortPostDto[]> {

        return of(this.postService.getBookmarks(sort));

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

        this.userPostsBookmarks.subscribe(data => {
            delete data[data.indexOf(postId)];
        });
        this.postService.deleteBookmark(postId);
        this.showToast('Deleted from bookmarks');
    }
}
