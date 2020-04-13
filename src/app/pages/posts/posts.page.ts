import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ShortPostDto} from '../../model/ShortPostDto';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.page.html',
  styleUrls: ['posts.page.scss']
})
export class PostsPage implements OnInit {

  postsList: Observable<ShortPostDto[]>;

  constructor(private postService: PostService) {
    this.postsList = postService.getPost();
  }

  ngOnInit() {
  }

}
