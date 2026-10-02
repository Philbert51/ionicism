import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { TransactionService } from '../transaction-service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage implements OnInit {

  constructor(private productService: ProductService, 
    private transactionService: TransactionService) { }

  quantity: number = 0;
  products:any[] = [];
  transactions:any[]=[];

  ngOnInit( ) {
    this.products = this.productService.product;
    this.transactions = this.transactionService.transactions;
  }
  TambahKeKeranjang(p_transactionId: number, p_productId: number, 
     p_productPrice: number){
    this.transactions.push({transactionId:1 + p_transactionId,
      productId: p_productId,
      quantity: this.quantity,
      subtotal: p_productPrice * this.quantity
    });
      
  }
  TambahQty(){
    this.quantity++;
  }
  KurangQty(){
    if(this.quantity > 0){
      this.quantity--;
    }
    else{
      this.quantity = 0;
    }
  }
}
