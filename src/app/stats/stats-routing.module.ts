import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThemesComponent } from "./themes/themes.component";
import { ThemeQuestionsComponent } from "./theme-questions/theme-questions.component";
import { canActivateFn } from '../guards/auth.guard';

const routes: Routes = [
  { path: "themes", component: ThemesComponent, canActivate: [canActivateFn] },
  {
    path: "tQuestions",
    component: ThemeQuestionsComponent,
    canActivate: [canActivateFn],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}
