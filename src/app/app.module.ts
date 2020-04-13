import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CacheModule} from 'ionic-cache';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    CacheModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    Camera,
    SocialSharing,
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
