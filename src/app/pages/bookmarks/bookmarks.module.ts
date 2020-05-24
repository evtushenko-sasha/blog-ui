import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BookmarksPage} from './bookmarks.page';
import {ExploreContainerComponentModule} from '../../explore-container/explore-container.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{path: '', component: BookmarksPage}])
  ],
  declarations: [BookmarksPage]
})
export class BookmarksPageModule {
}
