import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { producerNotifyConsumers } from '@angular/core/primitives/signals';
import { TransactionService } from '../transaction-service';
import { CartService } from '../cart-service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  products: any[]=[];
  detailTransaction: any[] = [];
  transactions: any[] = [];
  cart:any[]=[];
  constructor(private productService: ProductService,
    private transactionService: TransactionService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.products = this.productService.product;
    this.transactions = this.transactionService.transactions;
    this.cart = this.cartService.cart;
  }
  
}
