import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, map, tap } from "rxjs";
import { UserStoreService } from "./user-store.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private userStoreService: UserStoreService
  ) {}

  register(username: string, password: string): Observable<any> {
    console.log(`register (${username},${password})`);

    return this.http.post<any>("/api/register", {
      username: username,
      password: password,
    });
  }

  login(username: string, password: string): Observable<any> {
    console.log(`login (${username},${password})`);

    return this.http
      .post<any>("/api/login", {
        username: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          console.log("UserService login: ", response.token);
          this.userStoreService.token = response.acces_token;
        })
      );
  }

  isAuthenticated(): boolean {
    return this.userStoreService.token != null;
  }

  logout(): Observable<any> {
    console.log(`logout`);
    this.userStoreService.reset();
    return this.http.post<any>("/api/logout", {})
  }
}
