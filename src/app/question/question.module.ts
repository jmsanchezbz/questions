import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionService } from '../services/question.service';
import { QuestionFilterComponent } from './question-filter/question-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from '../services/api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuestionEditComponent } from './question-edit/question-edit.component';

@NgModule({
    imports: [
        CommonModule,
        QuestionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        QuestionItemComponent,
        QuestionListComponent,
        QuestionDetailComponent,
        QuestionFilterComponent,
        QuestionEditComponent
    ],
    providers: [
        QuestionService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        }
    ]
})
export class QuestionModule { }
