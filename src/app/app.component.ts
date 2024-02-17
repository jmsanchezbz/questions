import { Component, OnInit } from "@angular/core";
import { Router, provideRouter } from "@angular/router";
import { RouterLoggingService } from "./services/router-logging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "questions";

  constructor(
    private router: Router,
    private routerLogger: RouterLoggingService
  ) {
    console.log('AppComponent-constructor-------------------------------------------->',router.url);
  }

  ngOnInit(): void {
    console.log('AppComponent-ngInit-------------------------------------------->',this.router.url);
    //this.router.navigate(["/"]);
  }

}