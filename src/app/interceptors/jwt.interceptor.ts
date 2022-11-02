import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/api/localstorage-service/localstorage.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localstorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifedRequest = request.clone({
      headers: request.headers.append(
        "Authorization",
        `Bearer ${this.localstorage.get("user").jwt}`
      ),
    });
    return next.handle(modifedRequest);
  }
}
