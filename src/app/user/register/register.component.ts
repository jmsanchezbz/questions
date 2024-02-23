import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { of, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { NgIf, NgClass } from "@angular/common";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.css",
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
    ],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  formSubmitted = false;
  public message: string = '';
  hasError: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    console.log('RegisterComponent');
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4),
      ]),
    });
  }

  register() {
    this.formSubmitted = true;
        
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username').value;
      const password = this.registerForm.get('password').value;

      this.userService.register(username, password)
      .pipe(
        tap(response => {
          console.log('---login-authenticate',response)
        }),
        catchError((error) => {
          console.log('---Error: login-authenticate',error)
          this.message = error.error.msg;
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
          //We could redirect to login with this
          this.router.navigate(['user/login']);
        },
        error: (error) => {
          console.log("Login error: ", error);
          this.message = error.error.msg;
          this.hasError = true;
          throw error;
        },
        complete: () => console.info("login->complete"),
      });
    }
  }
}
