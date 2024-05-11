import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Question } from "../model/question";
import { catchError, Observable } from "rxjs";
import { QuestionFilterChange } from "../model/question-filter-change";
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  
  readonly basePath: string = `${environment.apiUrl}/api/questions`;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  findById(id: number): Observable<Question> {
    console.log(`QuestionService.findById ${this.basePath}/${id}`);

    return this.http.get<Question>(`${this.basePath}/${id}`)
    .pipe(catchError(this.sharedService.handleError));
  }

  findByParams(params: QuestionFilterChange): Observable<Question[]> {
    const filterParams = Object.keys(params).filter(
      (key) => params[key] !== null && params[key] !== 'null' && params[key] !== undefined
    );

    const queryString = filterParams
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .filter(Boolean) //filter out empty strings from the array
      .join("&");

    console.log("---QuestionService.findByParams", params, queryString);

    const path = queryString ? `?${queryString}` : '';

    return this.http.get<Question[]>(`${this.basePath}${path}`, )
    .pipe(catchError(this.sharedService.handleError));
  }

  update(question: Question): Observable<Question> {
    console.log(`---QuestionService.update`, question);

    return this.http.put<Question>(`${this.basePath}/${question.id}`, question)
    .pipe(catchError(this.sharedService.handleError));
  }
}

/*{
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      }),
    } */