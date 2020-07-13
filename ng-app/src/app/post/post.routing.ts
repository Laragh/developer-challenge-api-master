import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'post/:id/:slug', component: PostComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    PostComponent
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class PostRoutingModule { }
