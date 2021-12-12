import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transfer } from '../models/transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private _http: HttpClient) { 
  }
  
  // Trasferisci denaro. Ritorna true in caso di successo
  postTransfer(data: Transfer): Observable<boolean> {
    return this._http.post<boolean>(environment.apiUrl + '/transfer', data);
  }
}
