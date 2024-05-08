import { Component, OnInit } from "@angular/core";
import { Router, provideRouter } from "@angular/router";
import { RouterLoggingService } from "./services/router-logging.service";
import { environment } from "../environments/environment";

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
  ) {
    console.log("Production environment: " + environment.production);
  }

  ngOnInit(): void {}
}
