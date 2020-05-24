import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ShortPostDto} from '../../model/ShortPostDto';
import {PostService} from '../../service/post.service';
import {SortType} from '../../model/SortType';
import {IonRouterOutlet, IonSearchbar, ModalController} from '@ionic/angular';
import {ModalFiltersPage} from '../modal-filters/modal-filters-page.component';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.page.html',
  styleUrls: ['posts.page.scss'],
})
export class PostsPage implements OnInit {

  postsList: Observable<ShortPostDto[]>;

  page: number;
  pageSize: number;
  sort: string;
  sortType: SortType;
  searchValue: string;
  tagIds: BehaviorSubject<number[]>;
  showSearch: boolean;
  selectedDateFrom: Date;
  selectedDateTo: Date;
  @ViewChild(IonSearchbar, {static: false}) search: IonSearchbar;
  sorts: Observable<string[]>;


  constructor(private postService: PostService,
              private modalController: ModalController,
              private routerOutlet: IonRouterOutlet) {

    this.page = 0;
    this.pageSize = 10;
    this.showSearch = false;
    this.sorts = this.postService.getAvailableSorts();
    this.sortType = SortType.DESC;
    this.tagIds = new BehaviorSubject<number[]>(null);
    this.postsList = postService.getPostsByParams(this.page, this.pageSize, this.sort,
      this.selectedDateFrom, this.selectedDateTo, this.sortType, this.searchValue, this.tagIds.getValue());
  }

  ngOnInit() {
  }

  async loadMorePosts(event) {
    this.page++;
    this.postsList.subscribe(posts => {
      this.postService.getPostsByParams(this.page, this.pageSize, this.sort,
        this.selectedDateFrom, this.selectedDateTo, this.sortType, this.searchValue, this.tagIds.getValue())
        .subscribe(newPosts => {
          posts = posts.concat(newPosts);
          event.target.complete();
          this.postsList = new Observable<ShortPostDto[]>(subscriber => subscriber.next(posts));
        });
    });

  }

  async refreshPosts(event) {
    this.refreshPostsFromRemote();
    this.postsList.subscribe(posts => {
      event.target.complete();
      this.page = 0;
    });
  }

  async showSearchBar() {
    setTimeout(() => {
      this.showSearch = true;
      this.search.setFocus();
    }, 100);
  }

  async hideSearchBar(event) {
    setTimeout(() => {
      this.showSearch = false;
      if (event.target.value !== this.searchValue) {
        this.searchValue = event.target.value;
        this.page = 0;
        this.refreshPostsFromRemote();
      }
    }, 200);
  }

  async refreshFilters() {
    this.page = 0;
    this.selectedDateFrom = null;
    this.selectedDateTo = null;
    this.tagIds = new BehaviorSubject<number[]>(null);
    this.sort = null;
    this.searchValue = null;
    this.refreshPostsFromRemote();
  }

  async showFilters() {
    const modal = await this.modalController.create({
      component: ModalFiltersPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        selectedDateFrom: this.selectedDateFrom,
        selectedDateTo: this.selectedDateTo,
        selectedTagsIds: this.tagIds
      }
    });

    modal.onDidDismiss().then((detail) => {
      this.selectedDateFrom = detail.data.selectedDateFrom;
      this.selectedDateTo = detail.data.selectedDateTo;
      this.tagIds.next(detail.data.selectedTagsIds);
      this.refreshPostsFromRemote();
    });
    return await modal.present();
  }

  updateSort(event) {
    this.sort = event.target.value;
    this.refreshPostsFromRemote();
  }

  async refreshPostsFromRemote() {
    this.postsList = this.postService.getPostsByParams(this.page, this.pageSize, this.sort,
      this.selectedDateFrom, this.selectedDateTo, this.sortType, this.searchValue, this.tagIds.getValue());
  }

  searchPosts(event) {
    this.searchValue = event.target.value;
    this.page = 0;
    this.refreshPostsFromRemote();
  }
}
