import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/localstorage-service/localstorage.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localstorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let user = this.localstorage.get("user");
    if (user) {
      const modifedRequest = request.clone({
        headers: request.headers.append("Authorization", `Bearer ${user?.jwt}`),
      });
      return next.handle(modifedRequest);
    }
    return next.handle(request);
  }
}
