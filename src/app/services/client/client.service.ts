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
  
  getClientByCIN( cin:String):Observable<any> {
    return this.http.get(this.apiUrl + '/api/client/get-client/'+cin);

  }
}
