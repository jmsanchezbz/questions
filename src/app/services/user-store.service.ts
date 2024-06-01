import { Injectable } from "@angular/core";
import { User } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private readonly USER_TOKEN: string = "userToken";
  private readonly UID: string = "uid";
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

    const jsonUser = JSON.stringify(user);
    const base64User = this.encodeToBase64Unicode(jsonUser);

    localStorage.setItem(this.UID, base64User);
  }

  getUser() {
    const base64User = localStorage.getItem(this.UID);
    const jsonUser = this.decodeFromBase64Unicode(base64User);
    
    const user: User = JSON.parse(jsonUser);

    return user;
  }

  reset() {
    localStorage.removeItem(this.USER_TOKEN);
    this.user = null;
    this.token = null;
  }

  private encodeToBase64Unicode(str: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return btoa(String.fromCharCode(...data));
  }

  private decodeFromBase64Unicode(base64Str: string) {
    const binaryString = atob(base64Str);
    const data = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
    const decoder = new TextDecoder();
    return decoder.decode(data);
  }
}
