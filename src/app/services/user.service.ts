import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Observable,
  of,
  map,
  tap,
  catchError,
  throwError,
  EMPTY,
  timer,
  switchMap,
} from "rxjs";
import { UserStoreService } from "./user-store.service";
import { environment } from "../../environments/environment";
import { SharedService } from "../shared/services/shared.service";
import { Profile } from "../model/profile";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly tokenCheckInterval = 60000;

  constructor(
    private http: HttpClient,
    private userStoreService: UserStoreService,
    private sharedService: SharedService
  ) {}

  private checkTokenValidity(): Observable<boolean> {
    return this.http.get<any>(`${environment.apiUrl}/api/authenticated`).pipe(
      tap((response) => {
        console.log("UserService-CheckTokenValidity Authorized login attempt");
        if (response.authenticated == true) {
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError((error) => {
        console.error("UserService-CheckTokenValidity: ", error);
        return of(false);
      })
    );
  }

  public startTokenValidation(): void {
    timer(0, this.tokenCheckInterval)
      .pipe(
        switchMap(() => {
          console.log("StartTokenValidation timer");
          if (this.userStoreService.token) {
            return this.checkTokenValidity();
          } else {
            return of(false);
          }
        })
      )
      .subscribe({
        next: (response) => {
          console.log("UserService-startTokenValidation: ", response);
          if (!response) {
            this.userStoreService.reset();
          }
        },
        error: (error) => {
          console.error("UserService-startTokenValidation: ", error);
          throw error;
        },
        complete: () =>
          console.info("UserService-startTokenValidation->complete"),
      });
  }

  register(profile: Profile): Observable<any> {
    console.log(`UserService-register `, profile);

    return this.http
      .post<any>(`${environment.apiUrl}/api/register`, {
        name: profile.name,
        username: profile.username,
        password: profile.password,
        email: profile.email,
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  login(username: string, password: string): Observable<any> {
    console.log(`login (${username},${password})`);

    return this.http
      .post<any>(`${environment.apiUrl}/api/login`, {
        username: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          console.log("UserService login: ", response, response.access_token);
          this.userStoreService.token = response.access_token;
        }),
        catchError(this.sharedService.handleError)
      );
  }

  isAuthenticated(): boolean {
    return (
      this.userStoreService.token != null &&
      this.userStoreService.token != "null"
    );
  }

  logout(): Observable<any> {
    console.log(`logout`);
    this.userStoreService.reset();
    return this.http
      .post<any>(`${environment.apiUrl}/api/logout`, {})
      .pipe(catchError(this.sharedService.handleError));
  }
}
