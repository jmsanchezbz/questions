import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { QuestionFilterComponent } from "../../question/question-filter/question-filter.component";
import { QuestionFilterChange } from "../../model/question-filter-change";
import { StorageService } from "../../services/storage.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  share,
  startWith,
  Subject,
  Subscription,
  switchMap,
  tap,
} from "rxjs";
import { TrialService } from "../../services/trial.service";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Trial } from "../../model/trial";
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgIf,
  UpperCasePipe,
} from "@angular/common";
import { SelectionModel } from "@angular/cdk/collections";
import { TrialDoneIndicatorComponent } from "../trial-done-indicator/trial-done-indicator.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TrialConfigDlgComponent } from "../trial-config-dlg/trial-config-dlg.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SharedService } from "../../shared/services/shared.service";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: "app-trial-list",
  standalone: true,
  imports: [
    QuestionFilterComponent,
    TrialDoneIndicatorComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    DatePipe,
    NgClass,
    NgIf,
    MatSortModule,
    UpperCasePipe,
  ],
  templateUrl: "./trial-list.component.html",
  styleUrl: "./trial-list.component.scss",
})
export class TrialListComponent implements OnInit, AfterViewInit {
  readonly FILTER_CHANGE: string = "filter-change";
  public readonly TYPE: string = "t";

  public filter: QuestionFilterChange;
  private filterSubject: Subject<QuestionFilterChange> = new Subject();
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  public groups: string[] = ["a1", "a2"];
  public dataSource;
  private trialsSubscription: Subscription | null = null;
  public trials$: Observable<Array<Trial>>;

  selection = new SelectionModel<Trial>(false, []);
  displayedColumns: string[] = [
    "id",
    "is_completed",
    "updated_at",
    "name",
    "num_questions",
    "num_mistakes",
    "actions",
  ];

  constructor(
    private trialSvc: TrialService,
    private storageSvc: StorageService,
    public dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    console.log("TrialList ngOnInit:", this.filter);

    this.initFilter();

    this.trials$
    this.trialsSubscription = this.filterSubject.pipe(
      tap((filterSubject) => {
        console.log("---TrialListComponent:ngOnInit()", filterSubject);
      }),
      startWith(this.filterSubject),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((filterSubject: QuestionFilterChange) =>
        this.trialSvc.findAll()
      ),
      share()
    ).subscribe(trials =>{
      this.dataSource = new MatTableDataSource(Trial.sortByUpdatedAtDesc(trials));
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.filterSubject.next(this.filter);
    this.dataSource.sort = this.sort;
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

  trial(row?: Trial) {
    if (row) {
      this.router.navigateByUrl(`/trial/${row.id}`);
    }
  }

  generateTrialG() {
    console.log("Not implemented");
  }

  generateTrialT() {
    console.log("Not implemented");
  }

  openDialog() {
    const dialogRef = this.dialog.open(TrialConfigDlgComponent, {
      minWidth: 300,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`QuestionItem-openDialog: ${result}`);
    });
  }

  announceSortChange(sortState: Sort) {
    console.log(`Sorted ${sortState.direction}ending`);

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }
}
