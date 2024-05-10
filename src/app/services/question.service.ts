import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Question } from "../model/question";
import { Observable } from "rxjs";
import { QuestionFilterChange } from "../model/question-filter-change";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  //readonly domain: string = "https://api.jmsanchez.eu";
  readonly basePath: string = `${environment.apiUrl}/api/questions`;

  constructor(private http: HttpClient) {}

  findById(id: number): Observable<Question> {
    console.log(`QuestionService.findById ${this.basePath}/${id}`);

    return this.http.get<Question>(`${this.basePath}/${id}`);
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

    return this.http.get<Question[]>(`${this.basePath}${path}`, );
  }

  update(question: Question): Observable<Question> {
    console.log(`---QuestionService.update`, question);

    return this.http.put<Question>(`${this.basePath}/${question.id}`, question);
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