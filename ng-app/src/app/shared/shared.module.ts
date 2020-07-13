
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NavComponent,
    CommentsComponent
  ],
  declarations: [
    NavComponent,
    CommentsComponent
  ],
  entryComponents: [],
  providers: [
  ]
})
export class SharedModule { }
