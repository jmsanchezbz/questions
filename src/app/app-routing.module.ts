import { NgModule } from "@angular/core";
import { RouterModule, Routes, provideRouter } from "@angular/router";
import { QuestionRoutingModule } from "./question/question-routing.module";
import { UserRoutingModule } from "./user/user-routing.module";
import { TrialRoutingModule } from './trial/trial-routing.module';

const routes: Routes = [
  { path: "", redirectTo: "question/list", pathMatch: "full" },
  {
    path: "question",
    loadChildren: () =>
      import("./question/question.module").then((m) => m.QuestionModule),
  },
  {
    path: "trial",
    loadChildren: () =>
      import("./trial/trial.module").then((m) => m.TrialModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "stats",
    loadChildren: () => import("./stats/stats.module").then((m) => m.StatsModule),
  },
  { path: "**", redirectTo: "user/login" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    QuestionRoutingModule,
    UserRoutingModule,
    TrialRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
