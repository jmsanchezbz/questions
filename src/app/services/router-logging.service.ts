import { Injectable } from '@angular/core';
import { filter } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class RouterLoggingService {

  constructor(private router: Router) {
    console.log('RouterLoggingService loaded');
    
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(`RouterLogging change: ${event.url} -> ${event.urlAfterRedirects}`);
      });
  }
  
}

