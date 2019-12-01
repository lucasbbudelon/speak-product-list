import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getAll(): Observable<Product[]> {
    return of([
      {
        barCode: 1,
        name: 'Leite',
        description: 'UHT integral',
        price: 2.89
      },
      {
        barCode: 2,
        name: 'Hamburguer',
        description: 'Carne bovina moída congelada',
        price: 6.99
      },
      {
        barCode: 3,
        name: 'Mistura para bolo',
        description: 'Sabor chocolate',
        price: 2.25
      },
      {
        barCode: 4,
        name: 'Cereal',
        description: 'Flakes',
        price: 3.99
      },
      {
        barCode: 5,
        name: 'Lampada',
        description: 'Classic, 100 watt, 220v',
        price: 4.99
      },
      {
        barCode: 6,
        name: 'Pó para preparo de sorvete',
        description: 'Sabor morango',
        price: 12.50
      },
      {
        barCode: 7,
        name: 'Ketchup',
        description: 'Tomasito tradicional',
        price: 3.10
      },
      {
        barCode: 8,
        name: 'Detergente',
        description: 'Limpo tradicional',
        price: 1.89
      }
    ]);
  }
}
