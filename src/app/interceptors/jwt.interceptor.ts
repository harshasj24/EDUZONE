import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, retry } from "rxjs/operators";
import { LocalStorageService } from "../services/localstorage-service/localstorage.service";
import { LoaderService } from "../services/loader/loader.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private localstorage: LocalStorageService,
    private loader: LoaderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let user = this.localstorage.get("user");
    this.loader.show();
    if (user) {
      const modifedRequest = request.clone({
        headers: request.headers.append("Authorization", `Bearer ${user?.jwt}`),
      });
      return next.handle(modifedRequest).pipe(
        finalize(() => {
          this.loader.hide();
        })
      );
    }
    return next.handle(request);
  }
}
