import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/api/localstorage-service/localstorage.service";
import jwtDecode from "jwt-decode";
import { MatDialog } from "@angular/material/dialog";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private loaclstorage: LocalStorageService,
    private matDaialog: MatDialog,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let user = this.loaclstorage.get("user");
    let jwt: any = jwtDecode(user.jwt);
    let exp: any = new Date(jwt.exp * 1000);
    let currentDate: any = new Date();
    if (!jwt) {
      return false;
    }
    if (currentDate > exp) {
      alert("Sesson expired Login again");
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }
}
