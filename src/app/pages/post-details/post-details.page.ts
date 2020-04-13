import {Component, OnInit} from '@angular/core';
import {FullPostDto} from '../../model/FullPostDto';
import {PostService} from '../../service/post.service';
import {ActivatedRoute} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  post: Observable<FullPostDto>;

  constructor(private postService: PostService,
              private socialSharing: SocialSharing,
              private activatedRoute: ActivatedRoute) {
    const postId = activatedRoute.snapshot.params[`postId`];
    this.post = this.postService.getPostById(postId);
  }

  ngOnInit() {

  }

  sharePost() {
    this.post.subscribe((post) => {
      this.socialSharing.share('Look what I found', post.title, '', post.imageUrl);
    });
  }
}
