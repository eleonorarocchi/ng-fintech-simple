import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DayWithSlot } from '../models/day-with-slot';
import { DayWithSlots } from '../models/day-with-slots';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private _http: HttpClient) { 
  }

  // Ritorna l’elenco di sedi.
  getLocations(): Observable<Location[]> {
    return this._http.get<Location[]>(environment.apiUrl + '/locations')
  }
  
  // Ritorna l’elenco di slot disponibili per una sede.
  getSlots(locationId: number): Observable<DayWithSlots[]> {
    return this._http.get<DayWithSlots[]>(environment.apiUrl + `/slots/${locationId}`)
  }
  
  // Conferma un appuntamento. Ritorna true in caso di successo, altrimenti false.
  postSchedule(data: DayWithSlot): Observable<boolean> {
    return this._http.post<boolean>(environment.apiUrl + '/schedule', data);
  }
}
