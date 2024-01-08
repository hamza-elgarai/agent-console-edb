import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8083';
  constructor(private http: HttpClient) {}

  getBeneficiaries(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/USER-SERVICE/api/client/beneficiaires/${id}`
    );
  }
  getTransactions(donorId:any):Observable<any>{
    return this.http.get(
      `${this.baseUrl}/TRANSFER-SERVICE/api/v1/transaction/${donorId}`
    );
  }
  
  createBeneficiary(newBenificiary: any, clientId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/USER-SERVICE/api/client/beneficiaire/${clientId}`,
      newBenificiary
    );
  }

  // updateBenificiary(toUpdate: any): Observable<any> {
  //   return this.http.post(
  //     `${this.baseUrl}/USER-SERVICE/api/beneficiary/update`,
  //     toUpdate
  //   );
  // }

  getClientInfo(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/USER-SERVICE/api/client/get-client-data/${id}`
    );
  }

  sendOTP(clientId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/TRANSFER-SERVICE/api/otp/send-otp/${clientId}`
    );
  }

  submitTransaction(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/TRANSFER-SERVICE/api/v1/transaction/agent/submitTransaction`,
      data
    );
 
  }

  getBenificiariesByClientId(clientId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/USER-SERVICE/api/client/beneficiaires/${clientId}`
    );
  }
  getClientCIN(cin:string){
    return this.http.get(this.baseUrl+"/USER-SERVICE/api/client/get-client/"+cin)
  }

}
