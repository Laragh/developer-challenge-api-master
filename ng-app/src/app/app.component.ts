import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lgc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
}
