import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  store(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  retrieve(key: string): any {
    const item = localStorage.getItem(key);

    if (item != null) {
      return JSON.parse(item);
    } else {
      return null;
    }
  }

  reset() {
    localStorage.clear();
  }
}
