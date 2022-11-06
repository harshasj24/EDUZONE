import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../localstorage-service/localstorage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private localstorge: LocalStorageService,
    private router: Router
  ) {}

  logout() {
    this.localstorge.clearAll();
    this.router.navigate(["/"]);
  }
}
