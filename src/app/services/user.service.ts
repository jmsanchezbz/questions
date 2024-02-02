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

    return this.http.post<any>("/api/user/register", {
      username: username,
      password: password,
    });
  }

  authenticate(username: string, password: string): Observable<any> {
    console.log(`authenticate (${username},${password})`);

    return this.http
      .post<any>("/api/user/login", {
        username: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          console.log("UserService authenticate: ", response.token);
          this.userStoreService.token = response.token;
        })
      );
  }

  isAuthenticated(): boolean {
    return this.userStoreService.token != null;
  }

  logOut(): void {
    this.userStoreService.reset();
  }
}
