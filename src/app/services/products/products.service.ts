import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Product } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll() {
    const url = `${environment.api}/products`;
    return this.httpClient.get<Product[]>(url);
  }

  getById(id: number) {
    const url = `${environment.api}/products/${id}`;
    return this.httpClient.get<Product>(url);
  }
}
