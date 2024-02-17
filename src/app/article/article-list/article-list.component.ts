import { Component, OnInit } from "@angular/core";
import { Article } from "../../model/article";
import { ArticleService } from "../../services/article-service.service";
import {
  Observable,
  Subject,
  debounceTime,
  switchMap,
  distinctUntilChanged,
  startWith,
  share,
} from "rxjs";
import { query } from "@angular/animations";
import { ArticleItemComponent } from "../article-item/article-item.component";
import { NgFor, AsyncPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-article-list",
    template: `
    <div class="search">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by name"
        [(ngModel)]="searchTerm"
        (keyup)="search()"
      />
    </div>
    <div class="articles">
      <div *ngFor="let art of articles$ | async; index as i">
        <app-article-item
          [article]="art"
        ></app-article-item>
      </div>
    </div>
  `,
    styles: [
        `
      .search {
        width: 600px;
        margin: 0 auto;
      }
      .search input {
        width: 600px;
      }
      .articles {
        display: flex;
        flex-wrap: wrap;
        width: 920px;
        margin: 0 auto;
      }
      .articles > * {
        flex: 0 1 250px;
      }
      .articles > div {
        margin: 20px;
        width: 250px;
        border: 1px solid lightgrey;
      }
      .articles > div:hover {
        border: 1px solid black;
      }
    `,
    ],
    standalone: true,
    imports: [
        FormsModule,
        NgFor,
        ArticleItemComponent,
        AsyncPipe,
    ],
})
export class ArticleListComponent implements OnInit {
  //private
  public articles$: Observable<Array<Article>>;
  public searchTerm: string = "";
  private searchTerms: Subject<string> = new Subject();

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articles$ = this.searchTerms.pipe(
      startWith(this.searchTerm),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.articleService.getArticles(query)),
      share()
    );
  }

  search(): void {
    this.searchTerms.next(this.searchTerm);
  }
}
