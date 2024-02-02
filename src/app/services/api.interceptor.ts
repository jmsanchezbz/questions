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
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("------Api-interceptor: request to ", req, req.url, req.method, req.headers, req.body);
    
    return next.handle(req);
  }
}
