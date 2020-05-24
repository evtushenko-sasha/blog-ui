// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tagsAPI: 'http://localhost:8805/tags?page=1',
  commentsAPI: 'http://localhost:8804/comments',
  loginAPI: 'http://localhost:8081/auth',
  bookmarkAPI: 'http://localhost:8807/bookmarks',
  // postsAPI: 'http://localhost:8803/posts',
  postsAPI: 'https://blog-post-service.herokuapp.com/posts',
  username: 'browser',
  appPassword: '1234'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
