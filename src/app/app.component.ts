import { Component, OnInit } from "@angular/core";
import { Router, provideRouter } from "@angular/router";
import { RouterLoggingService } from "./services/router-logging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "questions";

  constructor(
    private router: Router,
    private routerLogger: RouterLoggingService
  ) {}

  ngOnInit(): void {}

}