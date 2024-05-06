import { Component } from '@angular/core';
import { BlogPost } from '../models/blogPost';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  blogPost = {
    title: '',
    content: '',
    image_url: '',
  };

  constructor(private blogService: BlogService, private router: Router) {}

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
  };

  generateSlug(title: string): string {
    return title.toLowerCase().replace(/[\s\W-]+/g, '-');
  }

  onSubmit(): void {
    const slug = this.generateSlug(this.blogPost.title);
    const postWithSlug: BlogPost = {
      ...this.blogPost,
      slug,
    };

    this.blogService.createBlogPost(postWithSlug).subscribe({
      next: (response) => {
        console.log('Blog post created successfully', response);
        // Navigate to the /blog route on success
        this.router.navigate(['/blog']);
      },
      error: (error) => {
        console.error('Error creating blog post:', error);
      },
    });
  }
}
