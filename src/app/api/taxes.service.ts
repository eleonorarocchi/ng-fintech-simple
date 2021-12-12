import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinct, filter, map, mergeAll, Observable, of, switchMap, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cities } from '../models/province';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private _http: HttpClient) { 
  }

  // Ritorna true in caso di successo, false altrimenti.
  postTaxes(data: any): Observable<boolean> {
    return this._http.post<boolean>(environment.apiUrl + '/taxes', data);
  }

  getProvince(value:string): Observable<string[]> {
    if(value === '')
      return of([])
    else
      return this._http.get<Cities[]>("assets/db.json").pipe(
        mergeAll(),
        distinct((item: Cities) => item.provincia.codice),
        switchMap((city: Cities) => of (city.provincia.nome)),
        filter((prov: string) => {
          return prov.toUpperCase().includes(value.toUpperCase(), 0);
        }),
        toArray()
      )
  }

  getMunicipality(province:string, value:string): Observable<string[]> {
    if(province === '')
      return of([])
    else
      return this._http.get<Cities[]>("assets/db.json").pipe(
        mergeAll(),
        distinct((item: Cities) => item),
        switchMap((city: Cities) => of ({nome: city.nome, provincia: city.provincia.nome})),
        filter((item: {nome: string, provincia:string}) => {
          return item.provincia === province && item.nome.toUpperCase().includes(value.toUpperCase(), 0);
        }),
        map((item) => item.nome),
        toArray()
      )
  }
}
