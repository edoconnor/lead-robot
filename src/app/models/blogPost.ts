import { SafeHtml } from '@angular/platform-browser';

export interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  safeContent?: SafeHtml;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  image_url?: string;
}
