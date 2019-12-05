import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

import { Product } from '../../services/products/products.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
  }
}
