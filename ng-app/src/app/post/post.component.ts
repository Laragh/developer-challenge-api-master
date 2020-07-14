import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../canonical.service';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PlatformService } from '../platform.service';

@Component({
  selector: 'lgc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, AfterViewChecked {
  postId: any;
  post: any;
  comments = [];
  absoluteBaseUrl = environment.absoluteBaseUrl;
  @ViewChild('hero') hero: ElementRef;

  constructor(
    private apiS: ApiService,
    private meta: Meta,
    private titleService: Title,
    private canonical: CanonicalService,
    private router: Router,
    private route: ActivatedRoute,
    private platformS: PlatformService
  ) {
    this.titleService.setTitle(`Let's Get Checked - Developer Challenge - Blog`);


    meta.addTag({ name: 'author', content: 'LGC - Lara Sweeney' });

    this.meta.addTag({
      name: 'keywords', content: `Let's get checked, developer, challenge, angular 10, blog`
    }, true);


    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.postId = Number(this.route.snapshot.paramMap.get('id'));

        if (this.postId) {
          this.apiS.getPosts().subscribe((res) => {
            res.map((post) => {

              if (post.id === this.postId) {
                this.post = post;
                this.meta.addTag({
                  name: 'description', content: `Let's Get Checked - Developer Challenge - blog, fashion, technology, social, trend, digital, angular 10, ${this.post.description}`
                }, true);

                this.getComments();

              }
            });
          });
        }

        this.canonical.createCanonicalURL(this.absoluteBaseUrl + event.url);


      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if (this.platformS.isBrowserCheck()) {
      setTimeout(() => {
        if (this.post && this.hero && this.hero.nativeElement.style.backgroundImage.indexOf(this.post.imageUrl) < 0) {
          this.hero.nativeElement.style.backgroundImage = `url(${this.post.imageUrl})`;
        }
      });
    }
  }

  getComments(): void {
    this.apiS.getApiComments(this.postId).subscribe((res) => {
      this.comments = res;
    });
  }

  filterTopic($event): void {
    this.router.navigateByUrl('/home/' + $event);
  }
}
