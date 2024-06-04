import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { SharedService } from "../shared/services/shared.service";
import { HttpClient } from "@angular/common/http";
import { StatsTheme } from "../model/stats-theme";
import { StatsThemeQuestion } from "../model/stats-theme-question";
import { QuestionFilterChange } from "../model/question-filter-change";
import { catchError, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatsService {
  readonly basePath: string = `${environment.apiUrl}/api/stats`;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  themes(params: QuestionFilterChange): Observable<StatsTheme[]> {
    console.log(`StatsService.findAll ${this.basePath}/themes`, params);

    const filterParams = Object.keys(params).filter(
      (key) =>
        params[key] !== null &&
        params[key] !== "null" &&
        params[key] !== undefined
    );

    const queryString = filterParams
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .filter(Boolean) //filter out empty strings from the array
      .join("&");

    const path = queryString ? `?${queryString}` : "";

    return this.http
      .get<StatsTheme[]>(`${this.basePath}/themes${path}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  tQuestions(params: QuestionFilterChange): Observable<StatsThemeQuestion[]> {
    console.log(
      `StatsService.findAll ${this.basePath}/themes/questions`,
      params
    );

    const filterParams = Object.keys(params).filter(
      (key) =>
        params[key] !== null &&
        params[key] !== "null" &&
        params[key] !== undefined
    );

    const queryString = filterParams
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .filter(Boolean) //filter out empty strings from the array
      .join("&");

    const path = queryString ? `?${queryString}` : "";

    return this.http
      .get<StatsThemeQuestion[]>(`${this.basePath}/themes/questions${path}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
