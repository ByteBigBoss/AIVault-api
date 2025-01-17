import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AluthInterceptor implements HttpInterceptor {

    constructor(private AuthService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const authToken = this.AuthService.getToken();

        const authRequset = req.clone({
            headers: req.headers.set('Authorization',"Bearer "+authToken)
        })

        return next.handle(authRequset)
    }

}