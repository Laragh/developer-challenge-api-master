import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, tap } from 'rxjs/operators'
import { imageUrls } from './shared/const/imageUrls.const';
import { navTopics } from './shared/const/nav-topics.const';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getApiPosts(): any {
    return this.http.get(environment.apiUrl + '/posts');
  }

  getApiComments(postId): any {
    return this.http.get(environment.apiUrl + '/posts/' + postId + '/comments');
  }

  addApiComments(postId, comment): any {
    return this.http.post(environment.apiUrl + '/posts/' + postId + '/comments', comment);
  }

  editApiComment(commentId, comment): any {
    return this.http.put(environment.apiUrl + '/comments/' + commentId, comment);
  }

  getPosts(): any {
    return this.getApiPosts().pipe(
      tap((posts: any) => {
        let imageCount = -1;
        let topicCount = -1;
        posts.map((post) => {
          if (imageCount >= imageUrls.length - 1) { imageCount = -1; }
          if (topicCount >= navTopics.length - 1) { topicCount = -1; }
          imageCount++;
          topicCount++;
          post.topic = navTopics[topicCount];
          post.imageUrl = '../..' + imageUrls[imageCount].url;
        });
      }
      )
    );
  }
}
