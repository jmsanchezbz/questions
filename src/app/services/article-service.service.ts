import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Article } from "../model/article";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(query: string): Observable<Article[]> {
    console.log("getArticles");
    return this.http.get<Article[]>(`/api/articles?q=${query}`);
  }

  getArticle(articleId: number): Observable<Article> {
    console.log(`getArticle: ${articleId}`);
    return this.http.get<Article>(`/api/articles/${articleId}`);
  }

  changeQuantity(
    articleId: number,
    changeInQuantity: number
  ): Observable<Article> {
    console.log(
      "onQuantityChange: " + articleId + " | change:" + changeInQuantity
    );
    return this.http.patch<Article>("/api/articles/" + articleId, {
      changeInQuantity: changeInQuantity,
    });
  }

  create(article: Article): Observable<any> {
    console.log('Service-create: ', article);
    
    return this.http.post("/api/articles", article);
  }
}
