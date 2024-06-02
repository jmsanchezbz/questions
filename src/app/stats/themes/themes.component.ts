import { AfterViewInit, Component, OnInit } from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  share,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { QuestionFilterChange } from "../../model/question-filter-change";
import { StorageService } from "../../services/storage.service";
import { MatTableModule } from "@angular/material/table";
import { QuestionFilterComponent } from "../../question/question-filter/question-filter.component";
import { TrialDoneIndicatorComponent } from '../../trial/trial-done-indicator/trial-done-indicator.component';
import { StatsTheme } from "../../model/stats-theme";
import { StatsService } from "../../services/stats.service";
import { AsyncPipe } from "@angular/common";
import { NavigationExtras, Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from '@angular/material/tooltip';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-themes",
  standalone: true,
  imports: [
    QuestionFilterComponent,
    TrialDoneIndicatorComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    MatTooltipModule
  ],
  templateUrl: "./themes.component.html",
  styleUrl: "./themes.component.scss",
})
export class ThemesComponent implements OnInit, AfterViewInit {
  readonly FILTER_CHANGE: string = "filter-change";
  public readonly TYPE: string = "t";

  public filter: QuestionFilterChange;
  private filterSubject: Subject<QuestionFilterChange> = new Subject();
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  public groups: string[] = ["a1", "a2"];

  public themes$: Observable<Array<StatsTheme>>;

  displayedColumns: string[] = [
    "theme",
    "num_questions",
    "num_right",
    "num_wrong",
    "right_wrong",
    "questions_done",
    "actions",
  ];

  constructor(
    private statsSvc: StatsService,
    private storageSvc: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("Themes ngOnInit:", this.filter);

    this.initFilter();

    this.themes$ = this.filterSubject.pipe(
      tap((filterSubject) => {
        console.log("---ThemesComponent:ngOnInit()", filterSubject);
      }),
      startWith(this.filterSubject),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((filterSubject: QuestionFilterChange) =>
        this.statsSvc.themes(filterSubject)
      ),
      share()
    );
  }

  ngAfterViewInit() {
    this.filterSubject.next(this.filter);
  }

  onFilterChanged(changes: QuestionFilterChange) {
    this.storageSvc.store(this.FILTER_CHANGE, changes);
    this.filterSubject.next(changes);
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

  questions(row?: any) {
    if (row) {
      const config = {
        adm: row.administration,
        grp: row.grup,
        thm: row.theme,
      };

      const navigationExtras: NavigationExtras = {
        queryParams: config,
      };

      this.router.navigate([`/stats/tQuestions`], navigationExtras);
    }
  }
}
