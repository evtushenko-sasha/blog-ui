import {Component} from '@angular/core';
import {ShortPostDto} from '../../model/ShortPostDto';
import {Observable} from 'rxjs';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  bookmarkedPosts: Observable<ShortPostDto[]>;

  constructor(private postService: PostService) {
    this.bookmarkedPosts = postService.getUserBookmarksPostsByParams();
  }

}
