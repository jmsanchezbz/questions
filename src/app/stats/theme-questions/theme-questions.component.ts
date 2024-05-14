import { AsyncPipe, UpperCasePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { StatsService } from "../../services/stats.service";
import { StatsThemeQuestion } from "../../model/stats-theme-question";
import { Observable } from "rxjs";
import { QuestionFilterComponent } from "../../question/question-filter/question-filter.component";
import { QuestionFilterChange } from "../../model/question-filter-change";
import { HttpErrorResponse } from "@angular/common/http";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: "app-theme-questions",
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    UpperCasePipe,
  ],
  templateUrl: "./theme-questions.component.html",
  styleUrl: "./theme-questions.component.scss",
})
export class ThemeQuestionsComponent implements OnInit {
  configParams;

  public tQuestions$: Observable<Array<StatsThemeQuestion>>;

  private message: string;
  private responseOK: boolean;
  private errorResponse: any;

  displayedColumns: string[] = [
    "number",
    "question",
    "right_questions",
    "wrong_questions",
    "balance"
  ];

  constructor(
    private route: ActivatedRoute,
    private statsSvc: StatsService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("Theme-questions->params", params);
      this.configParams = params;
    });

    const params: QuestionFilterChange = { ...this.configParams, verified: 0 };

    this.tQuestions$ = this.statsSvc.tQuestions(params);/*.subscribe({
      next: (response) => {},
      error: (error: HttpErrorResponse) => {
        this.message = error.error.msg;
        this.errorResponse = error.error;
        this.responseOK = false;
        this.sharedService.errorLog(this.errorResponse);
        throw error;
      },
      complete: () => {},
    });*/
  }
}
