import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product-service';
//import { producerNotifyConsumers } from '@angular/core/primitives/signals';
import { TransactionService } from '../transaction-service';
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
  listOfProducts: any[]=[];
  detailProducts: any[] = [];
  
  constructor(private productService: ProductService,
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.products = this.productService.product;
  }
  ionViewDidEnter(){
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
   
    for(let i in this.listOfProducts){
      let id = this.listOfProducts[i].id;
      let product = this.productService.getProductById(id);
      this.detailProducts.push(product);
      this.cdr.detectChanges()
      console.log(this.detailProducts);
    }
  }

}
