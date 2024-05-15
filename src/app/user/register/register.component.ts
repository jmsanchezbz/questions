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
  ParamMap,
  Router,
} from "@angular/router";
import { firstValueFrom, of, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { NgIf, NgClass, UpperCasePipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { HttpErrorResponse } from "@angular/common/http";
import { SharedService } from "../../shared/services/shared.service";
import { Profile } from "../../model/profile";
import { User } from "../../model/user";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { canActivateFn } from "../../guards/auth.guard";

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
    MatOptionModule,
    MatSelectModule,
  ],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  formSubmitted = false;
  userId: number | null = null;
  private user: User;
  public message: string = "";
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

  async ngOnInit() {
    const paramMap$ = await new Promise<ParamMap>((resolve, reject) => {
      const subscription = this.route.queryParamMap.subscribe({
        next: resolve,
        error: reject,
        complete: () => subscription.unsubscribe(),
      });
    });

    this.userId = paramMap$.has("user")
      ? parseInt(paramMap$.get("user"), 10)
      : null;

    console.log(
      "Register-onInit",
      this.userId,
      this.userService.isAuthenticated()
    );

    //Check if is a profile
    if (this.userService.isAuthenticated() && this.userId >= 0) {
      const passwordControl = this.registerForm.get("password");
      passwordControl.setValidators([
        Validators.minLength(4),
        Validators.maxLength(16),
      ]);
      passwordControl.clearValidators();
      passwordControl.updateValueAndValidity();

      this.userService.me().subscribe({
        next: (response) => {
          this.responseOK = true;
          console.log("Register->userSvc-me>next", response);
          if (response) {
            this.message = "Actualización satisfactoria";
            this.user = response;

            this.registerForm.setValue({
              id: this.user.id,
              name: this.user.name,
              username: this.user.username,
              email: this.user.email,
              role: this.user.role,
              password: "",
            });

            if ((this.user.role = "admin")) {
              this.registerForm.get("role").enable();
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          this.message = error.error.msg;
          this.errorResponse = error.error;
          this.responseOK = false;
          this.sharedService.errorLog(this.errorResponse);
          throw error;
        },
        complete: async () => {
          console.info("Register->userSvc-me>complete");
        },
      });
    }
  }

  createForm() {
    this.registerForm = this.fb.group({
      id: new FormControl({ value: 0, disabled: true }, []),
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
      role: new FormControl(
        { value: "user", disabled: true },
        Validators.required
      ),
    });
  }

  formSubmit() {
    if (this.userId >= 0) {
      this.editProfile();
    } else {
      this.register();
    }
  }
  private register() {
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

  private editProfile() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      const profile = new Profile(
        this.registerForm.get("id").value,
        this.registerForm.get("name").value,
        this.registerForm.get("username").value,
        this.registerForm.get("email").value,
        this.registerForm.get("password").value
      );

      profile.role = this.registerForm.get("role").value;

      const { id, ...reg } = profile;

      this.userService
        .editProfile(profile)
        .pipe(
          tap((response) => {
            console.log("RegisterComponent-edit", response);
          }),
          catchError((error) => {
            console.error("RegisterComponent-edit", error);
            this.message = error.error.msg;
            throw error;
          })
        )
        .subscribe({
          next: (response) => {
            console.log("RegisterComponent-edit: ", response);
            this.responseOK = true;
            if (response) {
              this.message = response.msg;
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error("RegisterComponent-edit: ", error);
            this.message = error.error.msg;
            this.errorResponse = error.error;
            this.responseOK = false;
            throw error;
          },
          complete: async () => {
            console.info("RegisterComponent-edit->complete");
            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );
          },
        });
    }
  }
}
