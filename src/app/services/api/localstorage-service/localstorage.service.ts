import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  set(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
}
