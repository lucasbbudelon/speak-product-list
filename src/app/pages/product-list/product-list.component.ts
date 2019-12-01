import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Product, ItemPurchase } from '../../services/products/products.model';
import { ProductsService } from '../../services/products/products.service';
import { SpeechService } from '../../services/speech/speech.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public barCode: number;
  public amount: number;

  public products: Product[];
  public shopping: ItemPurchase[];

  constructor(
    private productsService: ProductsService,
    private speechService: SpeechService
  ) { }

  ngOnInit() {
    this.shopping = [];
    this.amount = 1;
    this.loadProducts();
  }

  loadProducts() {
    this.productsService
      .getAll()
      .pipe(
        tap(products => this.products = products)
      )
      .subscribe();
  }

  add() {
    const product = this.products.find(p => p.barCode === this.barCode);
    if (product) {
      this.barCode = null;
      this.amount = 1;
      const itemPurchase: ItemPurchase = { product, amount: this.amount };
      this.shopping.push(itemPurchase);
      this.speakItem(itemPurchase, 'adicionado');
      this.speakSumPurchases();
    }
  }

  remove(product: Product) {
    const itemPurchase = this.shopping.find(item => item.product.barCode === product.barCode);
    this.shopping = this.shopping.filter(item => item.product.barCode !== product.barCode);
    this.speakItem(itemPurchase, 'removido');
    this.speakSumPurchases();
  }

  finish() {
    this.speechService.speak('Resumo do pedido!');
    this.shopping.forEach(item => {
      this.speakItem(item);
    });
    this.speakSumPurchases();
  }

  speakItem(itemPurchase: ItemPurchase, action: string = '') {

    const textItem = `${itemPurchase.amount} ${itemPurchase.product.name} (${itemPurchase.product.description}) ${action}`;
    const productPrice = this.speechService.convertMonetaryValue(itemPurchase.product.price);
    const productSum = this.speechService.convertMonetaryValue(itemPurchase.product.price * itemPurchase.amount);
    const textPrice = `Valor unitário ${productPrice}, valor total ${productSum}`;

    this.speechService.speak(`${textItem}! ${textPrice}.`);
  }

  speakSumPurchases() {
    const sumPurchases = this.speechService.convertMonetaryValue(this.sumPurchases);
    const textSumPurchases = `Total das compras ${sumPurchases}.`;
    this.speechService.speak(textSumPurchases);
  }

  get sumPurchases(): number {

    let amount = 0;

    if (this.shopping) {
      this.shopping.forEach(item => {
        amount += item.product.price * item.amount;
      });
    }

    return amount;
  }
}
