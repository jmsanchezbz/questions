import { NgModule } from "@angular/core";
import { RouterModule, Routes, provideRouter } from "@angular/router";
import { QuestionRoutingModule } from "./question/question-routing.module";
import { UserRoutingModule } from "./user/user-routing.module";

const routes: Routes = [
  { path: "", redirectTo: "question/list", pathMatch: "full" },
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
    UserRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
