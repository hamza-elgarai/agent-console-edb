import { Injectable } from '@angular/core';
const TOKEN_KEY = 'access_token';
const REFRESHTOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})


export class TokenStorageService {

  constructor() { }


  // public isLoggedIn(): boolean {
  //   const user = window.localStorage.getItem(USER_KEY);
  //   if (user) {
  //     return true;
  //   }
  //   return false;
  // }
  setToken(token: string,refresh:string): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESHTOKEN_KEY, refresh);

  }

  getToken(): string | null {
    // Implement your logic to retrieve the JWT token from wherever it's stored
    return localStorage.getItem(TOKEN_KEY);
  }
  clear(): void {
    window.localStorage.clear();
  }

  // public saveToken(token: string): void {
  //   window.localStorage.removeItem(TOKEN_KEY);
  //   window.localStorage.setItem(TOKEN_KEY, token);

  //   const user = this.getUser();
  //   if (user.id) {
  //     this.saveUser({ ...user, accessToken: token });
  //   }
  // }


  // public saveRefreshToken(token: string): void {
  //   window.localStorage.removeItem(REFRESHTOKEN_KEY);
  //   window.localStorage.setItem(REFRESHTOKEN_KEY, token);
  // }

  // public getRefreshToken(): string | null {
  //   return window.localStorage.getItem(REFRESHTOKEN_KEY);
  // }



}

