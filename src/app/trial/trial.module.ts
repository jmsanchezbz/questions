import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TrialListComponent } from './trial-list/trial-list.component';
import { TrialService } from '../services/trial.service';
import { TrialItemComponent } from './trial-item/trial-item.component';
import { TrialRoutingModule } from './trial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TrialListComponent,
    TrialItemComponent
  ],
  providers: [
    TrialService
  ],
})
export class TrialModule {}
