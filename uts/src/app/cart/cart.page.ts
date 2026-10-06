import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product-service';
//import { producerNotifyConsumers } from '@angular/core/primitives/signals';
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
  listOfProducts: any[]=[];
  constructor(private productService: ProductService,
    private transactionService: TransactionService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.products = this.productService.product;
    //this.transactions = this.transactionService.transactions;
    this.cart = this.cartService.cart;
    //this.listOfProducts = this.transactions[this.transactions.length - 1].produk;
    
  }
  ionViewWillEnter(){
    this.transactions = this.transactionService.transactions;
    console.log(this.transactions);

    for(let i = 0; i < this.transactions.length; i++){
      if(this.transactions[i].isCompleted ==  false){
        this.listOfProducts =  this.transactions[i].produk;
         console.log(this.listOfProducts);
         this.cdr.detectChanges();
        break;
      }
    }
   
  }
}
