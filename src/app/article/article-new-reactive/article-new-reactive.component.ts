import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { regexValidator } from "./regex-validator";
import { nameArticleValidator } from "./name-article-validator";
import { Article } from "../../model/article";
import { ArticleService } from "../../services/article-service.service";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-article-new-reactive",
    templateUrl: "./article-new-reactive.component.html",
    styleUrl: "./article-new-reactive.component.css",
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ArticleNewReactiveComponent {
  readonly IMAGE_URL_REGEX =
    /^http[s]?:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z]{2,3}\/.+\.(jpg|png){1}$/;

  public article: Article;
  public articleForm: FormGroup;
  formSubmitted = false;
  public message: string = "";

  constructor(private articleService: ArticleService, private fb: FormBuilder) {
    console.log('ArticleNewReactiveComponent');
    this.initArticle();
    this.createForm();
  }

  createForm() {
    this.articleForm = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        nameArticleValidator(),
      ]),
      imageUrl: new FormControl(null, [
        Validators.required,
        regexValidator(this.IMAGE_URL_REGEX),
      ]),
      price: new FormControl(null, [Validators.required, Validators.min(0.1)]),
      isOnSale: new FormControl(false),
    });
  }

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

  onSubmit() {
    this.formSubmitted = true;

    console.log(
      "Article form valid:" +
        this.articleForm.valid +
        " submitted:" +
        this.formSubmitted
    );

    if (this.articleForm.valid) {
      this.article = this.articleForm.value;
      
      this.articleService
        .create(this.article)
        .pipe(
          catchError((error) => {
            this.message = error.error.msg;
            return of(null);
          })
        )
        .subscribe((article:Article) => {
          this.message = "Article created succesfully (id: " + article.id + ")";
          this.initArticle();
        });

      console.log(this.article);
      console.log("Article form value", this.articleForm.value);
    }
  }
}
