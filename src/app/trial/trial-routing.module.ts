import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrialListComponent } from "./trial-list/trial-list.component";
import { TrialItemComponent } from './trial-item/trial-item.component';
import { trialLoadResolveFn } from '../services/trial-load-resolver.service';

const routes: Routes = [
  { path: 'list', component: TrialListComponent },
  { path: ':id', component: TrialItemComponent, resolve: { Trial: trialLoadResolveFn }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrialRoutingModule {}
