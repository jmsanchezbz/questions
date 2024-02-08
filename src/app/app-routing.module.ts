import { NgModule } from "@angular/core";
import { RouterModule, Routes, provideRouter } from "@angular/router";
import { QuestionRoutingModule } from "./question/question-routing.module";
import { UserRoutingModule } from "./user/user-routing.module";
import { ArticleRoutingModule } from "./article/article-routing.module";

const routes: Routes = [
  { path: "", redirectTo: "question/list", pathMatch: "full" },
  {
    path: "article",
    loadChildren: () =>
      import("./article/article.module").then((m) => m.ArticleModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "question",
    loadChildren: () => import("./question/question.module").then((m)=> m.QuestionModule)
  },
  { path: "**", redirectTo: "user/login" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    QuestionRoutingModule,
    UserRoutingModule,
    ArticleRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
