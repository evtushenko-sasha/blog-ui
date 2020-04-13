import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PostDetailPageRoutingModule} from './post-details-routing.module';

import {PostDetailsPage} from './post-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailPageRoutingModule
  ],
  declarations: [PostDetailsPage]
})
export class PostDetailPageModule {
}
