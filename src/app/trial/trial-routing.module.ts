import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrialListComponent } from "./trial-list/trial-list.component";
import { TrialItemComponent } from "./trial-item/trial-item.component";
import { trialLoadResolveFn } from "../services/trial-load-resolver.service";
import { canActivateFn } from "../guards/auth.guard";

const routes: Routes = [
  { path: "list", component: TrialListComponent, canActivate: [canActivateFn] },
  {
    path: ":id",
    component: TrialItemComponent,
    resolve: { trial: trialLoadResolveFn },
    canActivate: [canActivateFn],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrialRoutingModule {}
