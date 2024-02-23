import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNewReactiveComponent } from './article-new-reactive/article-new-reactive.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { DefaultImageUrlPipe } from './article-item/default-image-url.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../services/article-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticleAppInterceptor } from '../services/article-app.interceptor';
import { ArticleItemComponent } from './article-item/article-item.component';


@NgModule({
    imports: [
        CommonModule,
        ArticleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ArticleListComponent,
        ArticleNewReactiveComponent,
        ArticleDetailComponent,
        ArticleItemComponent,
        DefaultImageUrlPipe
    ],
    providers: [
        ArticleService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ArticleAppInterceptor,
            multi: true,
        }
    ]
})
export class ArticleModule { }
