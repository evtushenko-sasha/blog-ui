import {Component, OnInit, ViewChild} from '@angular/core';
import {FullPostDto} from '../../model/FullPostDto';
import {PostService} from '../../service/post.service';
import {ActivatedRoute} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Observable} from 'rxjs';
import {Comment} from '../../model/Comment';
import {CommentService} from '../../service/comment.service';
import {BookmarkService} from '../../service/bookmark.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, IonInput, IonList, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  post: Observable<FullPostDto>;
  comments: Observable<Comment[]>;
  private pageComments: number;
  private pageSize: number;
  private pageSort: string;
  private pageSortType: string;
  private sorts: Observable<string[]>;
  private commentFormGroup: FormGroup;
  @ViewChild(IonInput, {static: false}) commentInput: IonInput;
  @ViewChild(IonList, {static: false}) commentsList: IonList;
  private bookmarked: Observable<boolean>;

  constructor(private postService: PostService,
              private socialSharing: SocialSharing,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService,
              private bookmarkService: BookmarkService,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private alertController: AlertController) {
    const postId = activatedRoute.snapshot.params[`postId`];
    this.post = this.postService.getPostById(postId);
    this.pageComments = 0;
    this.pageSize = 10;
    this.sorts = this.commentService.getSortTypes();
    this.comments = this.commentService.getCommentsByPostId(postId, this.pageComments, this.pageSize, null, null);
    this.commentFormGroup = this.formBuilder.group({
      text: ['', Validators.required]
    });
    this.post.subscribe(post => {
      this.bookmarked = bookmarkService.containsInUserPostBookmarks(post.id);
    });
  }

  ngOnInit() {
  }

  /*TODO: implement toasts on actions*/

  sharePost() {
    this.post.subscribe((post) => {
      this.socialSharing.share('Look what I found', post.title, '', post.imageUrl);
    });
  }

  addToBookmarks() {
    this.post.subscribe(post => {
        this.bookmarkService.addPostToBookmarks(post.id);
        this.bookmarked = new Observable<boolean>(subscriber => subscriber.next(true));
      }
    );
  }

  deleteBookmarks() {
    this.post.subscribe(post => {
        this.bookmarkService.deleteFromBookmarks(post.id);
        this.bookmarked = new Observable<boolean>(subscriber => subscriber.next(false));
      }
    );
  }

  async loadMoreComments(event) {
    this.pageComments++;
    await this.loadComments();
    event.target.complete();
  }

  async sortComments(event) {
    this.pageSort = event.target.value;
    this.refreshComments();
  }

  async refreshComments() {
    this.pageComments = 0;
    this.post.subscribe(post => {
      this.commentService.getCommentsByPostId(post.id, this.pageComments, this.pageSize, this.pageSort, this.pageSortType)
        .subscribe(newComments => {
          this.comments = new Observable<Comment[]>(subscriber => subscriber.next(newComments));
        });
    });
  }

  async loadComments() {
    this.comments.subscribe(comments => {
      this.post.subscribe(post => {
        this.commentService.getCommentsByPostId(post.id, this.pageComments, this.pageSize, this.pageSort, this.pageSortType)
          .subscribe(newComments => {
            comments = comments.concat(newComments);
            this.comments = new Observable<Comment[]>(subscriber => subscriber.next(comments));
          });
      });
    });
  }

  async commentForm() {
    const comment: Comment = this.commentFormGroup.value;
    await this.post.toPromise().then(post => {
      comment.postId = post.id;
    });
    this.commentService.addComment(comment)
      .then(el => {
        this.showToast('Comment send');
        this.refreshComments();
        this.commentInput.value = null;
      });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'dark'
    });
    return await toast.present();
  }

  async deleteComment(comment: Comment) {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Do you want to delete this comment?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('delete');
            this.commentService.deleteComment(comment.id)
              .subscribe(el => {
                this.comments.subscribe(comments => {
                  comments.splice(comments.indexOf(comment), 1);
                });
              });
          }
        }
      ]
    });
    await alert.present();
  }


}
