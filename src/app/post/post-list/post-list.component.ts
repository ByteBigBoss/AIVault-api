import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import {AuthService} from "../../auth/auth.service"
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //     {title:'First Post',content:'This is the first post\'s content'},
  //     {title:'Second Post',content:'This is the second post\'s content'},
  //     {title:'Third Post',content:'This is the third post\'s content'},
  // ]

  isLoading = false;

  posts: Post[] = [];

  totalPosts = 0;

  postsPerPage = 2;

  pageSizeOptions =[2,3,4,8];

  currentPage = 1;

  userIsAluthenticated = false;

  // private postsSub: Subscription;

  constructor(private postsService: PostService,private AuthService: AuthService) {}


  ngOnInit(): void {
  
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsService
      .getPostUpdateListener()
      .subscribe((postsData:{posts:Post[],postCount:number}) => {
        this.isLoading = false;
        this.totalPosts =  postsData.postCount;
        this.posts = postsData.posts;
      });

      console.log(this.posts)
      this.userIsAluthenticated =  this.AuthService.getIsAuth();

      this.AuthService.getAuthStatusListener().subscribe((isAluth)=>{
        this.userIsAluthenticated = isAluth;
      })
  }

  onChangedPage(pageData:PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage,this.currentPage)
    });
  }

  ngOnDestroy(): void {
    // this.postsSub.unsubscribe();
  }
}
