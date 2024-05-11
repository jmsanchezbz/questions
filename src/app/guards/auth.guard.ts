import { Injectable, inject } from "@angular/core";
import {
  CanActivateFn,
  Router,
} from "@angular/router";
import { UserService } from "../services/user.service";

export const canActivateFn: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  
  console.log(`AuthGuard-canActivateFn isAuthenticated(${userService.isAuthenticated()})`);
  

  if (userService.isAuthenticated()) {
    console.log('AuthGuard-canActivateFn true');
    return true;
  }
  console.log('AuthGuard-canActivateFn false');

  return router.createUrlTree(["/user/login"]);
};
