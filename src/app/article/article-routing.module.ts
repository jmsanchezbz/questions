import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleNewReactiveComponent } from './article-new-reactive/article-new-reactive.component';
import { canActivateFn } from '../guards/auth.guard';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { articleLoadResolveFn } from '../services/article-load-resolver.service';

const routes: Routes = [
  { path: 'create', component: ArticleNewReactiveComponent, canActivate: [canActivateFn] },
  { path: 'list', component: ArticleListComponent },
  { path: ':id', component: ArticleDetailComponent, resolve: { Article: articleLoadResolveFn } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
