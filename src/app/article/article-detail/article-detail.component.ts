import { Component, OnInit } from "@angular/core";
import { Article } from "../../model/article";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ArticleService } from "../../services/article-service.service";
import { DefaultImageUrlPipe } from "../article-item/default-image-url.pipe";
import { NgIf, AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: "app-article-detail",
    templateUrl: "./article-detail.component.html",
    styleUrl: "./article-detail.component.scss",
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        CurrencyPipe,
        DefaultImageUrlPipe,
    ],
})
export class ArticleDetailComponent implements OnInit {
  public article$: Observable<Article>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.article$ = this.articleService.getArticle(
      this.activatedRoute.snapshot.params["id"]
    );
  }
}
