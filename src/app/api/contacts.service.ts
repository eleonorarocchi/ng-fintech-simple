import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private _http: HttpClient) { 
  }

  // Ritorna l’elenco di contatti.
  getContacts(): Observable<Contact[]> {
    return this._http.get<Contact[]>(environment.apiUrl + '/contacts');
  }

  // Aggiunge un contatto. Richiede tutti i dati del Contact a parte l’id, ritorna il Contact con il nuovo id.
  postContact(data: Partial<Contact>): Observable<Contact> {
    return this._http.post<Contact>(environment.apiUrl + '/contacts', data);
  }
  
  // Aggiorna il contatto.
  putContact(contactId: number, data: Partial<Contact>): Observable<Contact> {
    return this._http.put<Contact>(environment.apiUrl + `/contacts/${contactId}`, data);
  }
  
  // Rimuove il contatto. Ritorna true in caso di successo, false altrimenti.
  deleteContact(contactId: number): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + `/contacts/${contactId}`);
  }
}
