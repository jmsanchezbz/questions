import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStoreService } from '../services/user-store.service';
import { UserService } from '../services/user.service';


@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        UserStoreService,
        UserService
    ]
})
export class UserModule { }
