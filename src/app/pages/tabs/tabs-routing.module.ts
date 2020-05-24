import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../posts/posts.module').then(m => m.PostsPageModule)
          },
          {
            path: ':postId',
            loadChildren: () =>
              import('../post-details/post-details.module').then(m => m.PostDetailPageModule)
          }
        ]
      },
      {
        path: 'bookmarks',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../bookmarks/bookmarks.module').then(m => m.BookmarksPageModule)
          },
          {
            path: ':postId',
            loadChildren: () =>
              import('../post-details/post-details.module').then(m => m.PostDetailPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/posts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/posts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
