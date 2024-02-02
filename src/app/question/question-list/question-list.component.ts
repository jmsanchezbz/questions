import { AfterContentInit, AfterViewInit, Component, OnInit } from "@angular/core";
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
import { QuestionFilterComponent } from "../question-filter/question-filter.component";

@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrl: "./question-list.component.css",
})
export class QuestionListComponent implements OnInit, AfterViewInit {
  public questions$: Observable<Array<Question>>;
  private filter: Subject<QuestionFilterChange> = new Subject();
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  public groups: string[] = ["a1", "a2"];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questions$ = this.filter.pipe(
      tap((filter) => {
        console.log("---QuestionListComponent:ngOnInit()", filter);
      }),
      startWith(this.filter),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((filter: QuestionFilterChange) =>
        this.questionService.findByParams(filter)
      ),
      share()
    );
  }

  ngAfterViewInit(){
    const changes : QuestionFilterChange = {
      adm: 'caib',
      grp: 'a1',
      thm: 1,
      verified: null,
    };

    console.log('---QuestionListComponent:ngAfterContentInit()', changes);

    this.filter.next(changes);
  }

  onFilterChanged(changes: QuestionFilterChange) {
    console.log("----Question-list:onFilterChanged", changes);
    this.filter.next(changes);
  }

  reset() {
    console.log("----- Question-list: reset");
  }
}
