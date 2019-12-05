import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderService } from './services/order/order.service';
import { ProductsService } from './services/products/products.service';
import { SpeechService } from './services/speech/speech.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    OrderTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SpeechService,
    ProductsService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
