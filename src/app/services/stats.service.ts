import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { StatsTheme } from '../model/stats-theme';
import { StatsThemeQuestion } from '../model/stats-theme-question';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  readonly basePath: string = `${environment.apiUrl}/api/stats`;

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  themes(){
    console.log(`StatsService.findAll ${this.basePath}/themes`);

    return this.http.get<StatsTheme[]>(`${this.basePath}/themes`);
  }

  tQuestions(){
    console.log(`StatsService.findAll ${this.basePath}/themes/questions`);

    return this.http.get<StatsThemeQuestion[]>(`${this.basePath}/themes/questions`);
  }
}
