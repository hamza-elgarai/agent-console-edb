import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthenticationService } from '../services/auth/authentication.service';

const TOKEN_HEADER_KEY = 'Authorization';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService, private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token) {
      // Clone the request and add the Authorization header with the JWT token
      const authRequest = authReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('i am in interceptor with token '+token)
      return next.handle(authRequest);
    }
    console.log('i am in interceptor without token')
    return next.handle(authReq);

    }


    // return this.refreshTokenSubject.pipe(
    //   filter(token => token !== null),
    //   take(1),
    //   switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    // );
  
}
    
    // if (token) {
    //   // Clone the request and add the Authorization header with the JWT token
    //   const authRequest = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log('i am in interceptor with token '+token)
    //   return next.handle(authRequest);
    // }
    // console.log('i am in interceptor without token')

    // If no token, proceed with the original request

