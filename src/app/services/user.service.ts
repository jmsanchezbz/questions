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

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly tokenCheckInterval = 60000;

  constructor(
    private http: HttpClient,
    private userStoreService: UserStoreService
  ) {}

  private checkTokenValidity(): Observable<boolean> {
    return this.http
      .get<boolean>(`${environment.apiUrl}/api/authenticated`)
      .pipe(
        tap((response) => {
          console.log("Authorized login attempt");
        }),
        catchError((error) => {
          if (error.status === 401) {
            console.error("Unauthorized login attempt");
            this.userStoreService.token = null;
            return throwError(() => error);
          } else {
            return EMPTY;
          }
        })
      );
  }

  public startTokenValidation(): Observable<boolean> {
    return timer(0, this.tokenCheckInterval).pipe(
      switchMap(() => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>token validity timer");
        return this.checkTokenValidity();
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    console.log(`register (${username},${password})`);

    return this.http.post<any>(`${environment.apiUrl}/api/register`, {
      username: username,
      password: password,
    });
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
          console.log(
            "UserService login: ",
            response,
            response.access_token
          );
          this.userStoreService.token = response.access_token;
        })
      );
  }

  isAuthenticated(): boolean {
    return this.userStoreService.token != null && this.userStoreService.token != 'null';
  }

  logout(): Observable<any> {
    console.log(`logout`);
    this.userStoreService.reset();
    return this.http.post<any>(`${environment.apiUrl}/api/logout`, {});
  }
}
