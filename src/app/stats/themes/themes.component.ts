import { AfterViewInit, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, share, startWith, Subject, switchMap, tap } from 'rxjs';
import { QuestionFilterChange } from '../../model/question-filter-change';
import { StorageService } from '../../services/storage.service';
import { MatTableModule } from '@angular/material/table';
import { QuestionFilterComponent } from '../../question/question-filter/question-filter.component';
import { StatsTheme } from '../../model/stats-theme';
import { StatsService } from '../../services/stats.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [
    QuestionFilterComponent,
    MatTableModule
  ],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent implements OnInit, AfterViewInit {
  readonly FILTER_CHANGE: string = "filter-change";
  public readonly TYPE: string = 't';

  public filter: QuestionFilterChange;
  private filterSubject: Subject<QuestionFilterChange> = new Subject();
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  public groups: string[] = ["a1", "a2"];
  
  public themes$: Observable<Array<StatsTheme>>;
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private statsSvc: StatsService,
    private storageSvc: StorageService
  ) {}

  ngOnInit(): void {
    console.log("TrialList ngOnInit:", this.filter);

    this.initFilter();

    this.themes$ = this.filterSubject.pipe(
      tap((filterSubject) => {
        console.log("---TrialListComponent:ngOnInit()", filterSubject);
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

}
