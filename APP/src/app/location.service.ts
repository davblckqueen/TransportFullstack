import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
// Models
import {CountryModel, State, City} from 'src/app/quotation';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAllCountries(active?: boolean, iso3?: string, iso2?: string) {
    let params;
    params = {
      active: active || false
    };
    if (iso3 !== undefined) { // @ts-ignore
      params.iso3 = iso3;
    }
    if (iso2 !== undefined) { // @ts-ignore
      params.iso2 = iso2;
    }

    return this.http.get<CountryModel[]>(`${environment.api_url}/countries`, {
      // @ts-ignore
      params: params
    }).toPromise();
  }

  getCountryById(id: string) {
    return this.http.get<CountryModel>(`${environment.api_url}/countries/${id}`).toPromise();
  }

  getStatesByCountryId(countryId: number) {
    return this.http.get<State[]>(`${environment.api_url}/countries/${countryId}/states`).toPromise();
  }

  getStateById(id: string) {
    return this.http.get<State>(`${environment.api_url}/states/${id}`).toPromise();
  }

  getCitiesByStateId(stateId: number) {
    return this.http.get<City[]>(`${environment.api_url}/states/${stateId}/cities`).toPromise();
  }

  getCityById(id: string) {
    return this.http.get<State>(`${environment.api_url}/cities/${id}`).toPromise();
  }
}
