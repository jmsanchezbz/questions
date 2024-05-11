import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserStoreService } from "../../services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  private access_token: string = "";

  constructor(private userStoreService: UserStoreService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.access_token = this.userStoreService.token;

    if (this.access_token) {
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      });
    }

    console.log(
      "AuthInterceptor",
      this.access_token,
      req,
      localStorage.getItem("userToken"),
      localStorage.length
    );

    return next.handle(req);
  }
}
