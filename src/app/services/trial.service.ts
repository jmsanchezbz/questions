import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Trial } from "../model/trial";
import { catchError, Observable } from "rxjs";
import { QuestionFilterChange } from "../model/question-filter-change";
import { TrialQuestion } from "../model/trial-question";
import { SharedService } from "../shared/services/shared.service";

@Injectable({
  providedIn: "root",
})
export class TrialService {
  readonly basePath: string = `${environment.apiUrl}/api/trials`;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  findAll(): Observable<Trial[]> {
    console.log(`TrialService.findAll ${this.basePath}`);

    return this.http.get<Trial[]>(`${this.basePath}`);
  }

  findById(id: number): Observable<Trial> {
    console.log(`TrialService.findById ${this.basePath}/${id}`);

    return this.http
      .get<Trial>(`${this.basePath}/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  update(trial: Trial) {
    console.log(`TrialService.update ${this.basePath}/${trial.id}`);

    return this.http.put<Trial>(`${this.basePath}/${trial.id}`, trial);
  }

  updateTrialQuestion(tQuestion: TrialQuestion) {
    console.log(
      `TrialService.updateTQ ${this.basePath}/${tQuestion.trial_id}/questions/${tQuestion.question_id}`
    );

    return this.http
      .put<Trial>(
        `${this.basePath}/${tQuestion.trial_id}/questions/${tQuestion.question_id}`,
        tQuestion
      )
      .pipe(catchError(this.sharedService.handleError));
  }

  generate(params: QuestionFilterChange) {
    console.log(`TrialService.generate ${this.basePath}`);

    const config = this.trialConfig(params);
    return this.http
      .post<Trial>(`${this.basePath}`, config)
      .pipe(catchError(this.sharedService.handleError));
  }

  private trialConfig(params: QuestionFilterChange) {
    const base = {
      adm: params.adm,
      grp: params.grp,
    };
    let config;

    if (params.thm) {
      config = {
        ...base,
        typ: "theme",
        thm: params.thm,
      };
    } else {
      config = {
        ...base,
        typ: "exam",
      };
    }

    return config;
  }
}
