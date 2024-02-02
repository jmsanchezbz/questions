import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor } from "@angular/common/http";
import {
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {
    console.log("Api-interceptor created");
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("------Api-interceptor: request to ", req, req.url, req.method, req.headers, req.body);
    
    return next.handle(req);
  }
}
