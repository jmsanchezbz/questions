import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private readonly USER_TOKEN: string = "userToken";

  constructor() {}

  set token(token: string) {
    localStorage.setItem(this.USER_TOKEN, token);
  }

  get token(): string {
    return localStorage.getItem(this.USER_TOKEN);
  }

  reset() {
    localStorage.clear(); //removeItem(this.USER_TOKEN);
  }
}
