import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { of, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { NgIf, NgClass } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
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
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  formSubmitted = false;
  public message: string = "";
  hasError: boolean = false;
  private userId: number;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(
      "RegisterComponent",
      this.router,
      this.route.snapshot.paramMap.get("user")
    );
    this.createForm();
  }

  ngOnInit() {
   this.route.queryParamMap.subscribe((params) => {
    //this.userId = parseInt(params.get("user"), 10);
    console.log("888------------>", params,params.get('user'));
  });

    this.route.queryParams.subscribe((params) => {
      //this.userId = parseInt(params.get("user"), 10);
      console.log("------------>", params);
    });
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
    });
  }

  register() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      const username = this.registerForm.get("username").value;
      const password = this.registerForm.get("password").value;

      this.userService
        .register(username, password)
        .pipe(
          tap((response) => {
            console.log("---login-authenticate", response);
          }),
          catchError((error) => {
            console.log("---Error: login-authenticate", error);
            this.message = error.error.msg;
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
            //We could redirect to login with this
            this.router.navigate(["user/login"]);
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
