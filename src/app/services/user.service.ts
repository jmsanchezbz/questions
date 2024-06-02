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
import { User } from "../model/user";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly tokenCheckInterval = 5 * 60000; //5 min

  constructor(
    private http: HttpClient,
    private userStoreService: UserStoreService,
    private sharedService: SharedService,
    private route: Router
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

  public findById(userId: number): Observable<User> {
    console.log(`UserService-findById `);

    return this.http
      .get<User>(`${environment.apiUrl}/api/users/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  public findAll(): Observable<User[]> {
    console.log(`UserService-findAll `);

    return this.http
      .get<User[]>(`${environment.apiUrl}/api/users`)
      .pipe(catchError(this.sharedService.handleError));
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
            this.route.navigate(["/"]);
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

  me(): Observable<User> {
    console.log(`UserService-me `);

    return this.http
      .get<User>(`${environment.apiUrl}/api/users/me`)
      .pipe(catchError(this.sharedService.handleError));
  }

  register(profile: Profile): Observable<any> {
    console.log(`UserService-register `, profile);

    const dataProfile = {
      name: profile.name,
      username: profile.username,
      password: profile.password,
      email: profile.email,
    };

    return this.http
      .post<any>(`${environment.apiUrl}/api/register`, dataProfile)
      .pipe(catchError(this.sharedService.handleError));
  }

  editProfile(profile: Profile): Observable<any> {
    console.log(`UserService-edit `, profile);
    let dataProfile;

    const dataBase = {
      name: profile.name,
      username: profile.username,
      email: profile.email,
      role: profile.role,
    };

    if (profile.password.length > 3) {
      dataProfile = { ...dataBase, password: profile.password };
    } else {
      dataProfile = { ...dataBase };
    }

    return this.http
      .put<any>(`${environment.apiUrl}/api/users/${profile.id}`, dataProfile)
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

          const user = {
            id: 0,
            name: "",
            username: response.username,
            email: "",
            password: "",
            role: response.role,
            created_at: new Date(),
            updated_at: new Date(),
          };

          this.userStoreService.setUser(user);
          console.log(
            "UserService login - store: ",
            this.userStoreService.getUser()
          );
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

  isAdmin(): boolean {
    const user = this.userStoreService.getUser();
    return user && user.role && user.role == "admin" ? true : false;
  }

  logout(): Observable<any> {
    console.log(`logout`);
    this.userStoreService.reset();
    return this.http
      .post<any>(`${environment.apiUrl}/api/logout`, {})
      .pipe(catchError(this.sharedService.handleError));
  }
}
