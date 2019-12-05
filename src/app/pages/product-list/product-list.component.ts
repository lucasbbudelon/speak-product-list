import { Component, OnInit } from '@angular/core';
import { filter, finalize, tap } from 'rxjs/operators';
import { OrderItem } from 'src/app/services/order/order.model';
import { OrderService } from 'src/app/services/order/order.service';

import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private orderService: OrderService
  ) { }

  ngOnInit() {

  }

  addProduct(inputCode, inputAmount) {
    this.productsService
      .getById(inputCode.value)
      .pipe(
        filter(product => !!product),
        tap((product) => {
          const orderItem: OrderItem = { product, amount: inputAmount.value };
          this.orderService.addItem(orderItem);
        }),
        finalize(() => {
          inputCode.value = null;
          inputAmount.value = 1;
          inputCode.focus();
        })
      )
      .subscribe();
  }
}
