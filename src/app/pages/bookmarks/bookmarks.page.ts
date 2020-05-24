import {Component} from '@angular/core';
import {ShortPostDto} from '../../model/ShortPostDto';
import {Observable} from 'rxjs';
import {PostService} from '../../service/post.service';
import {SortType} from '../../model/SortType';
import {BookmarkService} from '../../service/bookmark.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: 'bookmarks.page.html',
  styleUrls: ['bookmarks.page.scss']
})
export class BookmarksPage {


  page: number;
  pageSize: number;
  sort: string;
  sortType: SortType;
  sorts: Observable<string[]>;

  bookmarkedPosts: Observable<ShortPostDto[]>;

  constructor(private postService: PostService,
              private bookmarkService: BookmarkService) {
    this.sorts = this.postService.getAvailableSorts();
    this.sortType = SortType.DESC;
    this.page = 0;
    this.pageSize = 10;

    this.bookmarkedPosts = bookmarkService.getBookmarksByParams(this.page, this.pageSize, this.sort, this.sortType);
  }

  async loadMorePosts(event) {
    this.page++;
    this.bookmarkedPosts.subscribe(posts => {
      this.bookmarkService.getBookmarksByParams(this.page, this.pageSize, this.sort, this.sortType)
        .subscribe(newPosts => {
          posts = posts.concat(newPosts);
          event.target.complete();
          this.bookmarkedPosts = new Observable<ShortPostDto[]>(subscriber => subscriber.next(posts));
        });
    });

  }

  async refreshPosts(event) {
    this.page = 0;
    this.refreshPostsFromRemote();
    this.bookmarkedPosts.subscribe(posts => {
      event.target.complete();
    });
  }

  updateSort(event) {
    this.sort = event.target.value;
    this.page = 0;
    this.refreshPostsFromRemote();
  }

  async refreshPostsFromRemote() {
    this.bookmarkedPosts = this.bookmarkService.getBookmarksByParams(this.page, this.pageSize, this.sort, this.sortType);
  }
}
