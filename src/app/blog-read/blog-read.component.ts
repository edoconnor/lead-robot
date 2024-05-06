import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
// import { AuthService } from '../services/auth.service';
import { BlogPost } from '../models/blogPost';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { SafePlainTextPipe } from '../services/safe-plain-text.pipe';
// import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-blog-read',
  templateUrl: './blog-read.component.html',
  styleUrls: ['./blog-read.component.css'],
})
export class BlogReadComponent implements OnInit {
  post: BlogPost | undefined;
  // isAdmin$: Observable<boolean>;
  currentUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    // private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    // private loggingService: LoggingService
  ) {
    // this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.fetchBlogPostBySlug(slug).subscribe((post) => {
        this.post = {
          ...post,
          safeContent: this.sanitizer.bypassSecurityTrustHtml(post.content),
        };
        this.updateMetaTags(slug);

        // this.loggingService.logPageView(null, `/post/${slug}`);
      });
    }
  }

  updateMetaTags(slug: string): void {
    if (this.post) {
      this.meta.updateTag({ name: 'title', content: this.post.title });
      const description = this.extractDescription(this.post.content);
      const imageUrl = this.post.image_url
        ? `https://lead-robot.com/${this.post.image_url}`
        : '';
      const ogDescription = description || '';

      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ name: 'twitter:title', content: this.post.title });
      this.meta.updateTag({
        name: 'twitter:description',
        content: ogDescription,
      });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

      this.meta.updateTag({ property: 'og:title', content: this.post.title });
      this.meta.updateTag({
        property: 'og:description',
        content: ogDescription,
      });
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({
        property: 'og:url',
        content: `https://lead-robot.com/post/${slug}`,
      }); //
    }
  }

  extractDescription(content: string): string {
    const plainText = content.replace(/<[^>]*>/g, '');
    const previewText = plainText.slice(0, 150);
    return previewText;
  }

  editPost() {
    if (this.post?.slug) {
      this.router.navigate(['/edit', this.post.slug]);
    }
  }
}