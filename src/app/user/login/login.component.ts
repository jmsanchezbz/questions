import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { NgIf, NgClass } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
})
export class LoginComponent {
  public loginForm: FormGroup;
  formSubmitted = false;
  message: string;
  hasError: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    console.log("LoginComponent");
    if (userService.isAuthenticated()) {
      router.navigate([""]);
    }
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      const username = this.loginForm.get("username").value;
      const password = this.loginForm.get("password").value;

      this.userService
        .login(username, password)
        .pipe(
          tap((response) => {
            console.log("---login-authenticate", response);
          }),
          catchError((error) => {
            console.log("---Error: login-authenticate", error);
            throw error;
          })
        )
        .subscribe({
          next: (response) => {
            console.log("---login response: ", response);
            this.hasError = false;
            if (response) {
              this.message = response.msg;
            }
          },
          error: (error) => {
            console.log("Subscribe: Login error: ", error);
            this.message = error.error.msg;
            this.hasError = true;
            throw error;
          },
          complete: () => console.info("login->complete"),
        });
    }
  }

  isLoggedIn(): boolean {
    return this.userService.isAuthenticated();
  }

  logout() {
    console.log("Login-logout");

    this.userService.logout();
  }
}
