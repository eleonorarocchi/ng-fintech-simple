import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { CardForm } from '../models/card-form';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private _http: HttpClient) { 
  }

  // Ritorna l’elenco di Card
  getCards(): Observable<Card[]> {
    return this._http.get<Card[]>(environment.apiUrl + '/cards')
  }

  // Aggiunge una carta. Ritorna la nuova carta creata.
  postCards(data: CardForm): Observable<Card> {
    return this._http.post<Card>(environment.apiUrl + '/cards', data)
  }

  // Ritorna l’elenco dei movimenti per la Card. Puoi specificare “limit” e “offset” come parametri di query.
  getMovements(cardId: string | null, limit: number, offset: number): Observable<any> {
    return this._http.get<any>(environment.apiUrl + `/cards/${cardId}/movements?limit=${limit}&offset=${offset}`)
  }
  
  // Rimuove la carta. Ritorna true in caso di successo, altrimenti false.
  deleteCard(cardId: string): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + `/cards/${cardId}`);
  }
}
