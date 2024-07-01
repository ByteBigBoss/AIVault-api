import { Injectable } from '@angular/core';
import { Advantage, Post, UseCases, updatePost } from './post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment} from "../../environments/environment"
const BACKEND_URL = "http://ascaorigin.ap-south-1.elasticbeanstalk.com/api"+ "/post/"

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];

  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {

  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL+'get-all-user-posts' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                id: post._id,
                title: post.title,
                content: post.content,
                imagePath: post.imagePath,
                link: post.link,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          }
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.postsUpdated.next({ posts: [...this.posts], postCount: transformedPosts.maxPosts });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // getPost(id: string) {
  //   return { ...this.posts.find((p) => p.id == id) };
  // }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      link: string;
      advantages: Advantage[],
      keyFeatures: string[],
      useCases: UseCases,
      postCategory: string,
      creator: string
    }>(BACKEND_URL+'getone/' + id);
  }

  addPost(title: string, content: string, image: File, link: string, advantages: Advantage[], keyFeatures: string[], useCases: UseCases, postCategory: string) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    postData.append('link', link);
    postData.append('advantages', JSON.stringify(advantages));
    postData.append('keyFeatures', JSON.stringify(keyFeatures));
    postData.append('useCases', JSON.stringify(useCases));
    postData.append('postCategory', postCategory);

    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL+'add',
        postData
      )
      .subscribe((res) => {
        // const post: Post = {
        //   id: res.post.id,
        //   title: title,
        //   content: content,
        //   imagePath: res.post.imagePath,
        // };
        // this.posts.push(post);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete(BACKEND_URL+'delete/' + postId);
  }

  updatePost(id: string, title: string, content: string, image: File | string, link: string, advantages: Advantage[], keyFeatures: string[], useCases: UseCases, postCategory: string) {
    let post: updatePost | FormData;
    if (typeof image === 'object') {
      post = new FormData();
      post.append('id', id);
      post.append('title', title);
      post.append('content', content);
      post.append('image', image, title);
      post.append('link', link);
      post.append('advantages', JSON.stringify(advantages));
      post.append('keyFeatures', JSON.stringify(keyFeatures));
      post.append('useCases', JSON.stringify(useCases));
      post.append('postCategory', postCategory);
    } else {
      post = { id: id, title: title, content: content, imagePath: image ,link:link,advantages:advantages,keyFeatures:keyFeatures,useCases:useCases,postCategory:postCategory};
    }

    this.http
      .put(BACKEND_URL+'update/' + id, post)
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }


  // updatePost(id: string, title: string, content: string, image: File | string) {
  //   let post: Post | FormData;
  //   if (typeof image === 'object') {
  //     post = new FormData();
  //     post.append('id', id);
  //     post.append('title', title);
  //     post.append('content', content);
  //     post.append('image', image, title);
  //   } else {
  //     post = { id: id, title: title, content: content, imagePath: image };
  //   }

  //   this.http
  //     .put('http://localhost:8001/api/post/update/' + id, post)
  //     .subscribe((res) => {
  //       const updatedPost = [...this.posts];
  //       const oldPostIndex = updatedPost.findIndex((p) => p.id === post.id);
  //       updatedPost[oldPostIndex] = post;
  //       this.posts = updatedPost;
  //       this.postsUpdated.next([...this.posts]);
  //       this.router.navigate(['/']);
  //     });
  // }
}
