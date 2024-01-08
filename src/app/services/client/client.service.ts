import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl: string = 'http://localhost:8083' ;
  // requestHeader = new HttpHeaders({ '': 'True' });

  constructor(private http: HttpClient) { }
  
  getClients():Observable<any> {
    return this.http.get(this.apiUrl + '/api/agents/clients');
  }
  addClient(client:any):Observable<any>{
    return this.http.post(this.apiUrl+"/USER-SERVICE/api/agents/client",client)
  }
  getTransaction(ref:string){
    return this.http.get(this.apiUrl+"/TRANSFER-SERVICE/api/v1/transaction/agent/"+ref)
  }
  sendOTP(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/TRANSFER-SERVICE/api/otp/send-otp/${clientId}`);
  }
  confirmRestitution(request:any):Observable<any>{
    return this.http.post(this.apiUrl+"/TRANSFER-SERVICE/api/v1/transaction/restituerTransaction",request)
  }
  servirTransaction(transactionReference:string,otp:string):Observable<any>{
    return this.http.post(this.apiUrl+"/TRANSFER-SERVICE/api/v1/transaction/agent/validate/"+transactionReference,otp)
  }
  extournerTransaction(request:any):Observable<any>{
    // referenceCode
    // motive
    // agentId
    return this.http.post(this.apiUrl+"/TRANSFER-SERVICE/api/v1/transaction/agent/reverse",request)
  }

  
  getClientByCIN( cin:String):Observable<any> {
    return this.http.get(this.apiUrl + '/api/client/get-client/'+cin);

  }

  getClientById(id: string |null) :Observable<any> {
    return this.http.get(this.apiUrl + '/api/client/get-client-data/'+id);
  }

  updateClient(client: any ,id:string|null) :Observable<any> {
    return this.http.put(this.apiUrl + '/api/agents/client/'+id,client);
  }
  deleteClient(id: string |null) :Observable<any> {
    return this.http.delete(this.apiUrl + '/api/agents/client/'+id);
  }
}
