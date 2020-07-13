import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../canonical.service';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lgc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: any;
  originalPosts: any;
  absoluteBaseUrl = environment.absoluteBaseUrl;
  selectedTopic: string;
  subscriptions = [];

  constructor(
    private apiS: ApiService,
    private meta: Meta,
    private titleService: Title,
    private canonical: CanonicalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(`Let's Get Checked - Developer Challenge - Blog`);
    this.canonical.createCanonicalURL(this.absoluteBaseUrl + '/home');

    meta.addTag({ name: 'author', content: 'LGC - Lara Sweeney' });
    this.meta.addTag({
      name: 'description', content: `Let's Get Checked - Developer Challenge - blog, fashion, technology, social, trend, digital, angular 10`
    }, true);
    this.meta.addTag({
      name: 'keywords', content: `Let's get checked, developer, challenge, angular 10, blog`
    }, true);

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.selectedTopic = this.route.snapshot.paramMap.get('topic');
        if (this.selectedTopic) {
          this.getPosts().then(() => {
            this.filterTopic(this.selectedTopic);
          });
        } else {
          this.getPosts();
        }
      }
    });
  }

  ngOnInit(): void {

  }

  getPosts(): any {
    const promise = new Promise((resolve, rej) => {
      const getP = this.apiS.getPosts().subscribe((res) => {
        res.map((post) => {
          post.truncatedContent = '<p>' +
            (post.content.split('<p>')[1].length < 30 ? post.content.split('<p>')[1]
              : post.content.split('<p>')[1].substring(0, 30) + '...');
          this.posts = res;
          this.originalPosts = res;
          resolve('posts created');
        });
      });
      this.subscriptions.push(getP);
    });
    return promise;
  }

  goToPost(postId: number, postSlug: string): void {
    this.router.navigateByUrl('/blogpost/' + postId + '/' + postSlug);
  }

  filterTopic($event): void {
    if (this.route.snapshot.paramMap.get('topic') !== $event) {
      this.router.navigateByUrl('/home/' + $event);
    }
    if ($event !== 'all') {
      const filteredPosts = this.originalPosts ? this.originalPosts.filter((post) => post.topic.name === $event) : [];
      this.posts = filteredPosts;
    } else {
      this.posts = this.originalPosts;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
