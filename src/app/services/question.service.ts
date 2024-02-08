import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Question } from "../model/question";
import { Observable } from "rxjs";
import { QuestionFilterChange } from "../model/question-filter-change";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  readonly domain: string = "https://api.jmsanchez.eu";
  readonly basePath: string = "/api/questions";

  constructor(private http: HttpClient) {}

  findById(id: number): Observable<Question> {
    console.log(`QuestionService.findById ${this.domain}${this.basePath}/${id}`);

    return this.http.get<Question>(`${this.domain}${this.basePath}/${id}`);
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

    return this.http.get<Question[]>(`${this.domain}${this.basePath}${path}`, );
  }

  update(question: Question, code: string): Observable<Question> {
    let payload = {...question,'seccode':code}
    console.log(`---QuestionService.update`, payload);

    return this.http.put<Question>(`${this.domain}${this.basePath}/${question.id}`, payload);
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