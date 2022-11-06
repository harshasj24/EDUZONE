import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/localstorage-service/localstorage.service";
import jwtDecode from "jwt-decode";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../services/auth/auth.service";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private loaclstorage: LocalStorageService,
    private matDaialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let user = this.loaclstorage.get("user");
    if (!user || !user?.jwt) {
      this.router.navigate(["/login"]);
      return false;
    }
    let jwt: any = jwtDecode(user?.jwt);
    let exp: any = new Date(jwt.exp * 1000);
    let currentDate: any = new Date();
    if (currentDate > exp) {
      alert("Sesson expired Login again");
      this.authService.logout();
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}
