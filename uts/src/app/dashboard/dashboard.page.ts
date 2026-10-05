import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-service';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  todaysRevenue:number = 0;
  todaysTransactionNumber:number = 0;
  todaysBestSellerProduct:any;
  todaysBestSellerQty:number = 0;
  numOfProducts:number = 0;
  bestSellerProduct:any;
  bestSellerQty:number = 0;
  
  constructor(private transactionservice:TransactionService, private productservice:ProductService) { }

  ngOnInit() {   
    this.todaysRevenue = this.transactionservice.countRevenue(true);
    this.todaysTransactionNumber = this.transactionservice.countNumberOfTransactions(true);
    let bestSeller = this.transactionservice.getBestSellingProduct(false); // berisi object literal yang isinya productId dan totalQty
    this.todaysBestSellerProduct = this.productservice.getProductById(bestSeller.productId);
    this.todaysBestSellerQty = bestSeller.totalQty;

    this.numOfProducts = this.productservice.product.length;
    bestSeller = this.transactionservice.getBestSellingProduct(true);
    this.bestSellerProduct = this.productservice.getProductById(bestSeller.productId);
    this.bestSellerQty = bestSeller.totalQty;
  }
}
