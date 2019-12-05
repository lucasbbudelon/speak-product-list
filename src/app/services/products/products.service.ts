import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Product } from './products.model';
import { Observable, of } from 'rxjs';
import { PRODUCTS_LIST } from './products.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<Product[]> {
    // const url = `${environment.api}/products`;
    // return this.httpClient.get<Product[]>(url);
    return of(PRODUCTS_LIST);
  }

  getById(id: number): Observable<Product> {
    // const url = `${environment.api}/products/${id}`;
    // return this.httpClient.get<Product>(url);
    return of(PRODUCTS_LIST.find(p => p.id === id));
  }
}
