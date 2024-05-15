import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { NgIf, NgClass } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { SharedService } from "../../shared/services/shared.service";
import { HttpErrorResponse } from "@angular/common/http";

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
    MatCardModule,
  ],
})
export class LoginComponent {
  public loginForm: FormGroup;
  formSubmitted = false;
  message: string;
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService
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

  async login() {
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
            console.log("Login-login response: ", response);
            this.responseOK = true;
            if (response) {
              this.message = response.msg;
            }
          },
          error: async (error: HttpErrorResponse) => {
            console.error("Login error: ", error);
            this.message = error.message;
            this.errorResponse = error;
            this.responseOK = false;
            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );
          },
          complete: async () => {
            console.info("login->complete");
            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );
            
            if (this.responseOK) {
              this.router.navigate([""]);
            }
          },
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
