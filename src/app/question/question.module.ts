import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionService } from '../services/question.service';
import { QuestionFilterComponent } from './question-filter/question-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        QuestionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        QuestionItemComponent,
        QuestionListComponent,
        QuestionDetailComponent,
        QuestionFilterComponent
    ],
    providers: [
        QuestionService,
    ]
})
export class QuestionModule { }
