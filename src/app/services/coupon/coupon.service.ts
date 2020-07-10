import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private url = "https://dashboard-node-backend.herokuapp.com/api/company";

  constructor(private http: HttpClient) { }

  createCoupon(couponData){
    let token = localStorage.getItem("token");
    let jsonCouponData = JSON.stringify(couponData);
    console.log(jsonCouponData);
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post("https://dashboard-node-backend.herokuapp.com/api/create-coupon", jsonCouponData, { headers: getHeaders })
      .pipe(catchError(this.errorHandler));
  }

  getAllCoupons(){
    let token = localStorage.getItem("token");
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get("https://dashboard-node-backend.herokuapp.com/api/coupons", { headers: getHeaders })
      .pipe(catchError(this.errorHandler));
  }

  updateCoupon(coupon){
    let token = localStorage.getItem("token");
    const params: HttpParams = new HttpParams().set('id', coupon._id);

    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.put("https://dashboard-node-backend.herokuapp.com/api/update/coupon", { headers: getHeaders, params: params })
      .pipe(catchError(this.errorHandler));
  }

  deleteCoupon(coupon){
    let token = localStorage.getItem("token");
    const params: HttpParams = new HttpParams().set('id', coupon._id);

    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete("https://dashboard-node-backend.herokuapp.com/api/delete/coupon", { headers: getHeaders, params: params })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
