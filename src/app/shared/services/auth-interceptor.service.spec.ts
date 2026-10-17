import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router, provideRouter } from '@angular/router';
import { throwError } from 'rxjs';

import { AuthInterceptorService } from './auth-interceptor.service';
import { UserStoreService } from '../../services/user-store.service';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(AuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset user store and navigate to /user/login on 401 error', () => {
    const userStoreService = TestBed.inject(UserStoreService);
    const router = TestBed.inject(Router);
    spyOn(userStoreService, 'reset');
    spyOn(router, 'navigate');

    const req = new HttpRequest('GET', '/api/trials');
    const next: HttpHandler = {
      handle: () => throwError(() => new HttpErrorResponse({ status: 401 })),
    };

    service.intercept(req, next).subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
      },
    });

    expect(userStoreService.reset).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/user/login']);
  });
});
