import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDisplayComponent } from './blog-display/blog-display.component';
import { BlogReadComponent } from './blog-read/blog-read.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'blog', component: BlogDisplayComponent },
  { path: 'create', component: BlogCreateComponent },
  { path: 'main', component: MainComponent },
  { path: 'post/:slug', component: BlogReadComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
