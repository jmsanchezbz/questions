import { Component, OnInit } from "@angular/core";
import { Trial } from "../../model/trial";
import { ActivatedRoute } from "@angular/router";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { QuestionItemComponent } from "../../question/question-item/question-item.component";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { catchError, Observable, of } from "rxjs";
import { TrialQuestion } from "../../model/trial-question";
import { TrialService } from "../../services/trial.service";
import { SharedService } from "../../shared/services/shared.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { TrialStatsDlgComponent } from "../trial-stats-dlg/trial-stats-dlg.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: "app-trial-item",
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButtonModule,
    QuestionItemComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    MatIconModule
  ],
  templateUrl: "./trial-item.component.html",
  styleUrl: "./trial-item.component.scss",
})
export class TrialItemComponent implements OnInit {
  adm: string;
  grp: string;
  thm: string;

  name: string;

  trial: Trial;
  hideTheme: boolean;

  tQuestions$: Observable<TrialQuestion[]>;
  private message: string;
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private trialSvc: TrialService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { trial: Trial }) => {
      console.log("TrialItemComponent:", data.trial[0]);

      this.trial = data.trial[0];
      this.adm = this.trial.administration;
      this.grp = this.trial.grup;
      this.thm = this.trial.theme;

      this.name = this.trial.name;
      this.hideTheme = this.trial.theme ? true : false;

      this.tQuestions$ = of<TrialQuestion[]>(this.trial.trial_questions);
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  onAnswerSelected(change: TrialQuestion) {
    let errorResponse: any;

    console.log("TrialList onAnswerSelected", change);

    if (this.trial.is_completed) {
      return;
    }

    this.trialSvc.updateTrialQuestion(change).subscribe({
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
        await this.sharedService.managementToast(
          "feedback",
          this.responseOK,
          this.errorResponse
        );

        /*if (this.responseOK) {
              this.router.navigate([""]);
            }*/
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TrialStatsDlgComponent, {
      data: this.trial,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`TrialItem-openDialog: ${result}`);
    });
  }

  scrollToTop() {
    const topElement = document.querySelector('#top');
    topElement.scrollIntoView({ behavior: "smooth" });
  }
}
