import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'http://localhost:8081/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    // BASE_PATH: 'http://localhost:8080'
    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

    public username: any;
    public password: any;


  constructor(private http: HttpClient) { }


  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        'email':username,
        password,
      },
      httpOptions
    );
  }


  register(firstName: string,lastName : string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        firstName,
        lastName,
        email,
        password,
      },
      httpOptions
    );
  }

    isAuthenticated(){
      console.log('isAuthenticated is called')
      let token = localStorage.getItem("access_token")
      if(token===null) return false;
      return true
    }
    logout(): Observable<any> {
      return this.http.post(AUTH_API + 'logout', { }, httpOptions);
    }
}
