import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-service';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  arrTodaysTransactions: any[] = [];

  todaysRevenue: number = 0;
  todaysProfit: number = 0;
  todaysTransactionNumber: number = 0;
  todaysBestSellerProduct: any;
  todaysBestSellerQty: number = 0;
  numOfProducts: number = 0;
  bestSellerProduct: any;
  bestSellerQty: number = 0;

  adaTodaysBestSeller: boolean = false;
  adaAllTimeBestSeller: boolean = false;

  username: string = '';

  constructor(private transactionservice: TransactionService, private productservice: ProductService, private router: Router, private accountService: AccountService) {
    this.username = this.accountService.getUsername();
  }

  ngOnInit() {
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }

    this.arrTodaysTransactions = this.transactionservice.getTransactionToday();

    this.todaysRevenue = this.transactionservice.countRevenue(true);
    this.todaysProfit = this.transactionservice.countProfit(true);
    this.todaysTransactionNumber = this.transactionservice.countNumberOfTransactions(true);
    let todaysBestSeller = this.transactionservice.getBestSellingProduct(false); // berisi object literal yang isinya productId dan totalQty atau null jika tidak ada data transaksi
    if (todaysBestSeller == null) {
      this.adaTodaysBestSeller = false;
    }
    else {
      this.adaTodaysBestSeller = true;
      this.todaysBestSellerProduct = this.productservice.getProductById(todaysBestSeller.productId);
      this.todaysBestSellerQty = todaysBestSeller.totalQty;
    }

    this.numOfProducts = this.productservice.product.length;
    let bestSeller = this.transactionservice.getBestSellingProduct(true);
    if (bestSeller == null) {
      this.adaAllTimeBestSeller = false;
    }
    else {
      this.adaAllTimeBestSeller = true;
      this.bestSellerProduct = this.productservice.getProductById(bestSeller.productId);
      this.bestSellerQty = bestSeller.totalQty;
    }
  }

  countItemsQtyTotal(): number {
    if (this.arrTodaysTransactions.length == 0) {
      return 0;
    }
    else {
      let itemCount = 0;
      for (let i in this.arrTodaysTransactions) {
        for (let j in this.arrTodaysTransactions[i].produk) {
          let product = this.arrTodaysTransactions[i].produk[j];
          itemCount += product.quantity;
        }
      }
      return itemCount;
    }
  }
}
