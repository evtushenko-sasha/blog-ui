import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PostDetailsPage} from './post-details.page';

const routes: Routes = [
  {
    path: '',
    component: PostDetailsPage
  },
  {
    path: 'post-details',
    loadChildren: './post-details/post-details.module.ts'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostDetailPageRoutingModule {
}
