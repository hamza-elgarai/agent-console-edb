import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  apiUrl: string = 'http://localhost:8083' ;
  // requestHeader = new HttpHeaders({ '': 'True' });

  constructor(private http: HttpClient) { }

  getAgentByEmail(email: string |null) :Observable<any> {
    return this.http.get(this.apiUrl + '/api/agents/getAgentByEmail/'+email);
  }


}
