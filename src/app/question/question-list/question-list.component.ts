import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { Question } from "../../model/question";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  share,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { QuestionService } from "../../services/question.service";
import { QuestionFilterChange } from "../../model/question-filter-change";
import { StorageService } from "../../services/storage.service";
import { QuestionItemComponent } from "../question-item/question-item.component";
import { AsyncPipe } from "@angular/common";
import { QuestionFilterComponent } from "../question-filter/question-filter.component";
import { TrialQuestion } from "../../model/trial-question";
import { UserStoreService } from "../../services/user-store.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: "app-question-list",
    templateUrl: "./question-list.component.html",
    styleUrl: "./question-list.component.scss",
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    QuestionFilterComponent,
    QuestionItemComponent,
    AsyncPipe,
    MatIconModule,
    MatButtonModule
]
})
export class QuestionListComponent implements OnInit, AfterViewInit {
  readonly FILTER_CHANGE: string = "filter-change";

  public tQuestions$: Observable<Array<TrialQuestion>>;
  public filter: QuestionFilterChange;
  private filterSubject: Subject<QuestionFilterChange> = new Subject();
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  public groups: string[] = ["a1", "a2"];
  public showAnswer: boolean = true;

  constructor(
    private questionService: QuestionService,
    private storageSvc: StorageService,
    private userStoreSvc: UserStoreService
  ) {}

  ngOnInit() {
    console.log(
      "QuestionList ngOnInit:",
      this.filter,
      this.userStoreSvc.getUser(),
      this.userStoreSvc.token
    );

    this.initFilter();

    this.tQuestions$ = this.filterSubject.pipe(
      tap((filterSubject) => {
        console.log("---QuestionListComponent:ngOnInit()", filterSubject);
      }),
      startWith(this.filterSubject),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((filterSubject: QuestionFilterChange) =>
        this.questionService.findByParams(filterSubject).pipe(
          map((questions: Array<Question>) => {
            return questions.map((question) => {
              return TrialQuestion.from(question);
            });
          })
        )
      ),
      share()
    );
  }

  ngAfterViewInit() {
    this.filterSubject.next(this.filter);
  }

  initFilter() {
    const item = this.storageSvc.retrieve(this.FILTER_CHANGE);

    if (item != null) {
      this.filter = item;
    } else {
      this.filter = {
        adm: "caib",
        grp: "a1",
        thm: 1,
        verified: null,
      };
    }
  }

  onFilterChanged(changes: QuestionFilterChange) {
    this.storageSvc.store(this.FILTER_CHANGE, changes);
    this.filterSubject.next(changes);
  }

  scrollToTop() {
    const topElement = document.querySelector('#top');
    topElement.scrollIntoView({ behavior: "smooth" });
  }
}
