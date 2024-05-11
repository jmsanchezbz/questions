import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class MenuComponent {
  constructor(private router: Router, private userService: UserService) {}

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  home(): void {
    console.log("Menu home");
    this.router.navigateByUrl("/question/list");
  }

  login(): void {
    console.log("Menu login");
    this.router.navigateByUrl("/user/login");
  }

  logout(): void {
    console.log("Menu logout");
    this.userService.logout();
    this.home();
  }

  profile(): void {
    console.log("Menu profile");
    this.router.navigateByUrl("/user/register?user=0");
  }

  register(): void {
    console.log("Menu register");
    this.router.navigateByUrl("/user/register");
  }

  themes(): void {
    console.log("Menu themes NOT IMPLEMENTED");

    this.router.navigateByUrl("/trial/themes");
  }

  trials(): void {
    this.router.navigate(["/trial/list"]);
  }
}
