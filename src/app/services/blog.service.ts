import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BlogPost } from '../models/blogPost';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private url = 'https://portfolio-backend-2jmg.onrender.com/blog';
  private blogSubject = new BehaviorSubject<BlogPost[]>([]);
  public blogs$: Observable<BlogPost[]> = this.blogSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchBlogPosts(): Observable<BlogPost[]> {
    const headers = this.createHeaders();
    return this.http.get<BlogPost[]>(this.url, { headers })
      .pipe(
        catchError(this.handleError<BlogPost[]>('fetchBlogPosts', []))
      );
  }

  createBlogPost(post: BlogPost): Observable<BlogPost> {
    const headers = this.createHeaders();
    return this.http.post<BlogPost>(this.url, post, { headers })
      .pipe(
        tap((newPost: BlogPost) => console.log(`added blog w/ id=${newPost._id}`)),
        catchError(this.handleError<BlogPost>('createBlogPost'))
      );
  }

  fetchBlogPostBySlug(slug: string): Observable<BlogPost> {
    const headers = this.createHeaders();
    const url = `${this.url}/${slug}`;
    return this.http.get<BlogPost>(url, { headers })
      .pipe(
        tap(_ => console.log(`fetched blog post slug=${slug}`)),
        catchError(this.handleError<BlogPost>(`fetchBlogPost slug=${slug}`))
      );
  }

  updateBlogPost(id: string, post: BlogPost): Observable<any> {
    const headers = this.createHeaders();
    const url = `${this.url}/${id}`;
    return this.http.patch(url, post, { headers })
      .pipe(
        tap(_ => console.log(`updated blog post id=${id}`)),
        catchError(this.handleError<any>('updateBlogPost'))
      );
  }
  
  deleteBlogPost(id: string): Observable<BlogPost> {
    const headers = this.createHeaders();
    const url = `${this.url}/${id}`;
    return this.http.delete<BlogPost>(url, { headers })
      .pipe(
        tap(_ => console.log(`deleted blog post id=${id}`)),
        catchError(this.handleError<BlogPost>('deleteBlogPost'))
      );
  }  

  private createHeaders(): HttpHeaders {
    return new HttpHeaders().set('x-api-key', environment.api_key);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}