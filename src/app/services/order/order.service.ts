import { Injectable } from '@angular/core';

import { Product } from '../products/products.model';
import { SpeechService } from '../speech/speech.service';
import { ORDER_SPEAK } from './order.constants';
import { OrderItem } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  items: OrderItem[];

  get sumOrder(): number {

    let amount = 0;

    if (this.items) {
      this.items.forEach(item => {
        amount += item.product.price * item.amount;
      });
    }

    return amount;
  }

  constructor(
    public speechService: SpeechService,
  ) {
    this.items = [];
  }

  addItem(orderItem: OrderItem) {
    this.items.push(orderItem);
    this.speakItem(orderItem, ORDER_SPEAK.PRODUCT.ADDED);
    this.speakSumOrder();
  }

  removeItem(product: Product) {
    const orderItem = this.items.find(item => item.product.id === product.id);
    this.items = this.items.filter(item => item.product.id !== product.id);
    this.speakItem(orderItem, ORDER_SPEAK.PRODUCT.REMOVED);
    this.speakSumOrder();
  }

  speakOrderSummary() {

    this.speechService.speak(ORDER_SPEAK.SUMMARY);

    if (this.items.length) {
      this.items.forEach(item => this.speakItem(item));
    } else {
      this.speechService.speak(ORDER_SPEAK.EMPTY);
    }

    this.speakSumOrder();
  }

  private speakItem(orderItem: OrderItem, action: string = '') {

    const textItem = `${orderItem.amount} ${orderItem.product.name} (${orderItem.product.description}) ${action}`;
    const productPrice = this.speechService.convertMonetaryValue(orderItem.product.price);
    const productSum = this.speechService.convertMonetaryValue(orderItem.product.price * orderItem.amount);
    const textPrice = `${ORDER_SPEAK.PRODUCT.UNITARY_VALUE} ${productPrice}, ${ORDER_SPEAK.PRODUCT.TOTAL_VALUE} ${productSum}`;

    this.speechService.speak(`${textItem}! ${textPrice}.`);
  }

  private speakSumOrder() {
    const sumOrder = this.speechService.convertMonetaryValue(this.sumOrder);
    const textSumOrder = `${ORDER_SPEAK.SUM} ${sumOrder}.`;
    this.speechService.speak(textSumOrder);
  }
}
