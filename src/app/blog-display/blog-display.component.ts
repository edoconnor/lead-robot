import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BlogPost } from '../models/blogPost';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-display',
  templateUrl: './blog-display.component.html',
  styleUrls: ['./blog-display.component.css'],
})
export class BlogDisplayComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.blogService.fetchBlogPosts().subscribe((posts) => {
      this.blogPosts = posts.map((post) => ({
        ...post,
        safeContent: this.sanitizer.bypassSecurityTrustHtml(post.content),
      }));
    });
  }
}
