import { Injectable } from "@angular/core";
import { User } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private readonly USER_TOKEN: string = "userToken";
  private user: User;

  constructor() {}

  set token(token: string) {
    localStorage.setItem(this.USER_TOKEN, token);
  }

  get token(): string {
    return localStorage.getItem(this.USER_TOKEN);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  reset() {
    localStorage.removeItem(this.USER_TOKEN);
    this.user = null;
  }
}
