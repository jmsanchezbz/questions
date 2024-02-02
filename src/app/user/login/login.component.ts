import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { ArticleService } from "../../services/article-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
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
    if(userService.isAuthenticated()){
      router.navigate(['article/create']);
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
        .authenticate(username, password)
        .pipe(
          tap(response => {
            console.log('---login-authenticate',response)
          }),
          catchError((error) => {
            console.log('---Error: login-authenticate',error);
            throw error;
          })
        )
        .subscribe({
          next: (response) => {
            console.log("---login response: ", response);
            this.hasError = false;
            if(response) {
              this.message = response.msg;
            }
            //We could redirect to articles with this
            //this.router.navigate(['article/list']);
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

  isLoggedIn():boolean {
    return this.userService.isAuthenticated();
  }

  logout() {
    console.log('Login-logout');
    
    this.userService.logOut();
  }

}
