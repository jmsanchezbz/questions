import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { questionLoadResolveFn } from '../services/question-load-resolver.service';
import { QuestionEditComponent } from './question-edit/question-edit.component';

const routes: Routes = [
  { path: 'list', component: QuestionListComponent },
  { path: ':id', component: QuestionDetailComponent, resolve: { Question: questionLoadResolveFn } },
  { path: 'edit/:id', component: QuestionEditComponent, resolve: { Question: questionLoadResolveFn } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
