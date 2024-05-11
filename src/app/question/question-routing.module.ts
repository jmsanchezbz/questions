import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuestionListComponent } from "./question-list/question-list.component";
import { QuestionDetailComponent } from "./question-detail/question-detail.component";
import { questionLoadResolveFn } from "../services/question-load-resolver.service";
import { QuestionEditComponent } from "./question-edit/question-edit.component";
import { canActivateFn } from "../guards/auth.guard";

const routes: Routes = [
  { path: "list", component: QuestionListComponent },
  {
    path: ":id",
    component: QuestionDetailComponent,
    resolve: { Question: questionLoadResolveFn },
    canActivate: [canActivateFn],
  },
  {
    path: "edit/:id",
    component: QuestionEditComponent,
    resolve: { Question: questionLoadResolveFn },
    canActivate: [canActivateFn],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
