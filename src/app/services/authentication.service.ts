import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private responseSubject: BehaviorSubject<Response>;
  public response: Observable<Response>;
  private url = "https://dashboard-node-backend.herokuapp.com/api/signin";
  userLoggedIn: boolean = false;
  constructor(private http: HttpClient) {
   this.responseSubject = new BehaviorSubject<any>(null);
   this.response = this.responseSubject.asObservable();
  }
  // login(username, password) {
  //   console.log("Inside Auth login");
  //   return this.http.post<any>(this.url, { email: username, password: password })
  //     .pipe(map(res => {
  //       console.log(res);
  //       // store details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('token', res.token.toString());
  //       this.responseSubject.next(res);
  //       return res.token;
  //     }));
  // }

  // isLoggedIn(){
  //   if(this.responseSubject.value!=null)
  //     return this.responseSubject.value.token;
  //   return undefined;
  // }

  isLoggedIn(){
    // if(this.responseSubject.value!=null)
    //   return this.responseSubject.value.token;
    // return undefined;
    return this.userLoggedIn;
  }

  loggedIn(bool){
    console.log("auth loggedin "+bool)
    this.userLoggedIn = bool;
  }
  login(loginData) {
    let jsonLoginData = JSON.stringify(loginData);
    console.log(jsonLoginData);
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.post(this.url, jsonLoginData, { headers: getHeaders })
      .pipe(catchError(this.errorHandler));
  }



  errorHandler(error: HttpErrorResponse) {
      return throwError(error);
  } 

}

interface Response {
  token: String;
  expiresIn: number;
  _id: String;
}
