import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  imports: [
    // RouterModule.forRoot(routes, {
    //   // initialNavigation: 'enabled',
    //   useHash: false,
    //   scrollPositionRestoration: 'enabled',
    //   preloadingStrategy: PreloadAllModules
    // }),
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    // RouterModule,
    SharedModule
  ]
})
export class HomeRoutingModule { }
