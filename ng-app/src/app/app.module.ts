import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { CanonicalService } from './canonical.service';

import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';
import { PlatformService } from './platform.service';

import { TransferHttpCacheModule } from '@nguniversal/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    CommonModule,
    HttpClientModule,
    HomeModule,
    PostModule,
    AppRoutingModule
  ],
  providers: [
    HttpClientModule,
    ApiService,
    CanonicalService,
    PlatformService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
