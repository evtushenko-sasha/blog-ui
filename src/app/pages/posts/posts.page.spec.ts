import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponentModule} from '../../explore-container/explore-container.module';

import {PostsPage} from './posts.page';

describe('postsPage', () => {
  let component: PostsPage;
  let fixture: ComponentFixture<PostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
