import { Component, Inject, Input, ChangeDetectionStrategy } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { Trial } from "../../model/trial";
import { TrialDoneIndicatorComponent } from "../trial-done-indicator/trial-done-indicator.component";
import { TrialService } from "../../services/trial.service";
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: "app-trial-stats-dlg",
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatListModule,
        MatIconModule,
        MatSelectModule,
        TrialDoneIndicatorComponent,
    ],
    templateUrl: "./trial-stats-dlg.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./trial-stats-dlg.component.scss"
})
export class TrialStatsDlgComponent {
  private message: string;
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private trialSvc: TrialService,
    public dialogRef: MatDialogRef<TrialStatsDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public trial: Trial,
    private sharedService: SharedService
  ) {}

  unanswered(): number {
    return Trial.countUnanswered(this.trial);
  }

  closeExam() {


    this.trialSvc.close(this.trial).subscribe({
      next: (response) => {
        this.responseOK = true;
        if (response) {
          this.message = "Actualización satisfactoria";
        }
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error.msg;
        this.errorResponse = error.error;
        this.responseOK = false;
        throw error;
      },
      complete: async () => {
        console.info("login->complete");
        await this.sharedService.managementToast(
          "feedback",
          this.responseOK,
          this.errorResponse
        );
      },
    });

    console.log(
      "TrialItem closeExam not implemented",
      this.trial,
      Trial.countMistakes(this.trial),
      Trial.countRight(this.trial)
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
