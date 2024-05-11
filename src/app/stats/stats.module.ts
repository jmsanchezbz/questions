import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRoutingModule } from './stats-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatsService } from '../services/stats.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatsRoutingModule,
  ],
  providers: [ StatsService ]
})
export class StatsModule { }
