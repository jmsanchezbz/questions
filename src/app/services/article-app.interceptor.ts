import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpResponse } from "@angular/common/http";
import {
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { UserStoreService } from "./user-store.service";
import { Observable } from "rxjs";

@Injectable()
export class ArticleAppInterceptor implements HttpInterceptor {
  constructor(private userStoreService: UserStoreService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userStoreService.token;
    console.log("------Article-app-interceptor: request to ", req, req.url, req.method, req.headers, req.body, token);
    
    if (token) {
      console.log("--------Article-app-interceptor: token OK");
      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(request);
    }

    return next.handle(req);
  }
}
