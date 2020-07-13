import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { navTopics } from '../const/nav-topics.const';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lgc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  navMenu: any = navTopics;
  @Output() selectedTopic = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  selectTopic(value: string): void {
    this.selectedTopic.emit(value);
  }
}
