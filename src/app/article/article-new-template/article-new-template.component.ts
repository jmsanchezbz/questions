import { Component } from '@angular/core';
import { Article } from '../../model/article';
import { ArticleService } from '../../services/article-service.service';
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrl: './article-new-template.component.css',
})
export class ArticleNewTemplateComponent {
  
  public article: Article;
  public message: string = "";

  constructor(private articleService: ArticleService) {}

  initArticle() {
    this.article = {
      id: null,
      name: "",
      imageUrl: "",
      price: 0,
      isOnSale: false,
      quantityInCart: 0,
    };
  }

  submit(frm:any) {
    console.log('Article form valid', frm.valid);

    if (frm.valid) {
      this.article = frm.value;
      console.log('-----new Article form value', frm.value);
      this.articleService.create(this.article).pipe(
        catchError((error) => {
          this.message = error.error.msg;
          return of(null);
        })
      )
      .subscribe((article:Article) => {
        this.message = "Article created succesfully (id: " + article.id + ")";
        this.initArticle();
      });
    }
  }
}
