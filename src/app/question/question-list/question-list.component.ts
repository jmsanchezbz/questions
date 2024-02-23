import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from "@angular/core";
import { Question } from "../../model/question";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  share,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { QuestionService } from "../../services/question.service";
import { QuestionFilterChange } from "../../model/question-filter-change";
import { StorageService } from "../../services/storage.service";
import { QuestionItemComponent } from "../question-item/question-item.component";
import { NgFor, AsyncPipe } from "@angular/common";
import { QuestionFilterComponent } from "../question-filter/question-filter.component";

@Component({
    selector: "app-question-list",
    templateUrl: "./question-list.component.html",
    styleUrl: "./question-list.component.css",
    standalone: true,
    imports: [
        QuestionFilterComponent,
        NgFor,
        QuestionItemComponent,
        AsyncPipe,
    ],
})
export class QuestionListComponent implements OnInit, AfterViewInit {
  readonly FILTER_CHANGE: string = "filter-change";

  public questions$: Observable<Array<Question>>;
  public filter: QuestionFilterChange;
  private filterSubject: Subject<QuestionFilterChange> = new Subject();
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  public groups: string[] = ["a1", "a2"];
  protected storageSvc: StorageService = new StorageService();

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    console.log("QuestionList ngOnInit:", this.filter);

    this.initFilter();

    this.questions$ = this.filterSubject.pipe(
      tap((filterSubject) => {
        console.log("---QuestionListComponent:ngOnInit()", filterSubject);
      }),
      startWith(this.filterSubject),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((filterSubject: QuestionFilterChange) =>
        this.questionService.findByParams(filterSubject)
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

  reset() {
    this.storageSvc.reset();
  }
}
