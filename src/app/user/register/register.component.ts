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
import { HttpErrorResponse } from "@angular/common/http";
import { SharedService } from "../../shared/services/shared.service";
import { Profile } from "../../model/profile";

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
  private userId: number;
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
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
      console.log("888------------>", params, params.get("user"));
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
      const profile = new Profile(
        0,
        this.registerForm.get("name").value,
        this.registerForm.get("username").value,
        this.registerForm.get("email").value,
        this.registerForm.get("password").value
      );
      const { id, ...reg } = profile;

      this.userService
        .register(profile)
        .pipe(
          tap((response) => {
            console.log("RegisterComponent-register", response);
          }),
          catchError((error) => {
            console.error("RegisterComponent-register", error);
            this.message = error.error.msg;
            throw error;
          })
        )
        .subscribe({
          next: (response) => {
            console.log("RegisterComponent-register: ", response);
            this.responseOK = true;
            if (response) {
              this.message = response.msg;
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error("RegisterComponent-register: ", error);
            this.message = error.error.msg;
            this.errorResponse = error.error;
            this.responseOK = false;
            throw error;
          },
          complete: async () => {
            console.info("RegisterComponent-register->complete");
            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigate(["user/login"]);
            }
          },
        });
    }
  }
}
