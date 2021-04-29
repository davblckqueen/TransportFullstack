import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

import {CountryModel, QuotationRequest, QuotationResponse} from 'src/app/quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {

  constructor(private http: HttpClient) { }

  createQuotation(body: any): Promise<QuotationResponse | Object>{
    return this.http.post(`${environment.api_url}/quotations`, body).toPromise();
  }

  getAllQuotation(active?: boolean, iso3?: string, iso2?: string):QuotationResponse[]|any {
    return this.http.get<QuotationResponse[]>(`${environment.api_url}/quotations`).toPromise();
  }
}
