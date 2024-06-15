import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
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
import { NgIf, NgClass, UpperCasePipe, NgFor } from "@angular/common";
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

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
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
  public isAdmin = false;
  public selUser: number = 0;
  public users: User[];
  public message: string = "";
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
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

    this.isAdmin = this.userSvc.isAdmin();

    this.fetchUsers();

    this.userId = paramMap$.has("user")
      ? parseInt(paramMap$.get("user"), 10)
      : null;

    console.log(
      "Register-onInit userId+isAuthenticated",
      this.userId,
      this.userSvc.isAuthenticated()
    );

    //Check if is a profile
    if (this.userSvc.isAuthenticated() && this.userId >= 0) {
      const passwordControl = this.registerForm.get("password");
      passwordControl.setValidators([
        Validators.minLength(4),
        Validators.maxLength(16),
      ]);
      passwordControl.clearValidators();
      passwordControl.updateValueAndValidity();

      this.fetchMe();
    }
  }

  private fetchMe() {
    this.userSvc.me().subscribe({
      next: (response) => {
        this.responseOK = true;
        console.log("Register->userSvc-me>next", response);
        if (response) {
          this.message = "Actualización satisfactoria";
          this.user = response;
          this.selUser = this.user.id;

          this.initFormValues(this.user);
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

  private fetchUserId(userId: number) {
    this.userSvc.findById(userId).subscribe({
      next: (response) => {
        this.responseOK = true;
        console.log("Register->userSvc-findById>next", response);

        if (response) {
          this.message = "User.FindById";
          this.user = response;
          this.selUser = this.user.id;

          this.initFormValues(this.user);
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
        console.info("Register->userSvc-findById>complete");
      },
    });
  }

  private initFormValues(user: User) {
    this.registerForm.setValue({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      password: "",
    });

    if (this.isAdmin) {
      this.registerForm.get("role").enable();
    }
  }

  private fetchUsers() {
    console.log("Register-loadUsers");

    if (!this.isAdmin) {
      this.users = [this.user];
      return;
    }

    this.userSvc.findAll().subscribe({
      next: (response) => {
        this.responseOK = true;
        console.log("Register->loadUsers>next", response);
        if (response) {
          this.message = "User.findAll";
          this.users = response;
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
        console.info("Register->loadUsers>complete");
      },
    });
  }

  private createForm() {
    this.registerForm = this.fb.group({
      id: new FormControl({ value: null, disabled: true }, []),
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
    const user_id = this.registerForm.get("id").value;
    console.log(
      "Register-formSubmit isEdit:" + (user_id && user_id >= 0),
      this.registerForm.get("id").value
    );

    if (user_id && user_id > 0) {
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

      this.userSvc
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
          error: async (error: HttpErrorResponse) => {
            console.error("RegisterComponent-register: ", error);
            this.message = error.error.msg;
            const resp = this.sharedService.from(error);
            this.errorResponse = resp;
            this.responseOK = false;

            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );
            this.sharedService.errorLog(this.errorResponse);
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
      this.userSvc
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
          error: async (error: HttpErrorResponse) => {
            console.error("RegisterComponent-edit: ", error);
            this.message = error.message;
            const resp = this.sharedService.from(error);
            this.errorResponse = resp;

            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );
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

  changeUser(selUserId: number) {
    console.log("SelUserId: " + selUserId);

    this.fetchUserId(selUserId);
  }

  goHome() {
    this.router.navigate([""]);
  }
}
