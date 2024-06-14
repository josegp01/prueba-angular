import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private readonly http = inject(HttpClient);
  private readonly URL: string = 'https://inclubtest.com:2053';

  loginUser(emailAddress:string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const body: string = JSON.stringify({
      username: emailAddress,
      password: password
    });
    return this.http.post<any>(`${this.URL}/api/token`,body,httpOptions).pipe( map( res => res));
  }
  getInfo(id:string): Observable<any> {
    return this.http.get<any>(`${this.URL}/api/suscription/payment/${id}`).pipe( map( res => res));
  }
  getSchedule(id:string,flag:string): Observable<any> {
    return this.http.get<any>(`${this.URL}/api/payment/schedule/vouchers/${id}/${flag}`).pipe( map( res => res));
  }

  validate(IdSuscription: string,ListIdPaymentsValidate:any,IsAcceptedPayment:number,ReasonRejection:{} ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const body: string = JSON.stringify({
      IdSuscription,
      ListIdPaymentsValidate,
      IsAcceptedPayment,
      ReasonRejection
    });
    return this.http.post<any>(`${this.URL}/api/payment/validate`,body,httpOptions).pipe( map( res => res));
  }

}
