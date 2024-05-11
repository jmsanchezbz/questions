import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThemesComponent } from "./themes/themes.component";
import { ThemeQuestionsComponent } from "./theme-questions/theme-questions.component";

const routes: Routes = [
  { path: "themes", component: ThemesComponent },
  { path: "tQuestions", component: ThemeQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}
