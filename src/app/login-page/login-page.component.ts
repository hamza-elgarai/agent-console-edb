import { Component } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthenticationService } from '../services/auth/authentication.service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  pwShown=false;  
  username:string ='';
  password:string='';
  constructor(public router:Router,private authService: AuthenticationService, private tokenService: TokenStorageService,private toastr:ToastrService) {
    if(this.tokenService.getToken()){
      this.router.navigateByUrl('/clients')
    }
   }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  login(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: data => {
 //       this.tokenService.saveUser(data);
       this.tokenService.setToken(data['body']['access_token'],data['body']['refresh_token']);
      // localStorage.setItem('access_token', data['access_token']);
      // localStorage.setItem('refresh_token', data['refresh_token']);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log ('i am logged in ')
        this.toastr.success("Vous êtes connectés")
        this.router.navigateByUrl('/clients')

      },
      error: err => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
        console.log('error '+ this.errorMessage)
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(){
    this.authService.logout();
    // clear local storage
    this.tokenService.clear();
    console.log('succesfully logged out')

  }
}
