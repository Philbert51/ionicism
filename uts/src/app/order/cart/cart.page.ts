import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product-service';
import { TransactionService } from '../../transaction-service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {

  id: number = 0;
  products: any[] = [];
  transactions: any[] = [];

  listOfProducts: any[] = [];
  activeTransaction: any;
  detailProducts: any[] = [];
  total: number = 0;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.transactions = this.transactionService.transactions;
    this.products = this.productService.product;
    this.activeTransaction = this.transactions[this.id];
    for (let i = 0; i < this.transactions.length; i++) {
      this.listOfProducts = this.transactions[i].produk;
    }
    for (let i in this.listOfProducts) {
      let id = this.listOfProducts[i].id;
      let product = this.productService.getProductById(id);
      this.detailProducts.push(product);
      this.total += this.listOfProducts[i].subtotal;
      console.log(this.detailProducts);
    }
  }
  quantity(p_productId: number): number {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);

    let jumlah: number = 0;
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          jumlah = transaksi.produk[i].quantity;
        }
      }
    }
    return jumlah;
  }
  isOne(p_productId: number): Boolean {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    let is1 = false;
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          if (transaksi.produk[i].quantity <= 1) {
            is1 = true;
            break;
          }
        }
      }
    }
    return is1;
  }
  isMaxed(p_productId: number): Boolean {
    let produk = this.productService.getProductById(p_productId);
    let isMax = false;
    if (produk != null) {
      if (produk.quantity == produk.stock + this.checking(p_productId)) {
        isMax = true;
      }
    }
    return isMax;
  }
  plus(p_productId: number) {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          if (produk.stock > 0) {
            transaksi.produk[i].quantity++;
            transaksi.produk[i].subtotal = transaksi.produk[i].quantity * transaksi.produk[i].sellingPrice;
            produk.stock--;
          }
          break;
        }
      }

    }
  }
  min(p_productId: number) {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          if (transaksi.produk[i].quantity > 1) {
            transaksi.produk[i].quantity--;
            transaksi.produk[i].subtotal = transaksi.produk[i].quantity * transaksi.produk[i].sellingPrice;
            produk.stock++;
          }
        }
      }

    }
  }
  checking(p_productId: number): number {
    let produk = this.productService.getProductById(p_productId);
    let produkQtyInTransaction = 0;
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          produkQtyInTransaction = transaksi.produk[i].quantity;
          console.log(produkQtyInTransaction);
        }
      }
    }
    return produkQtyInTransaction;
  }
  removeProduk(p_productId: number) {
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          this.transactionService.deleteProduk(p_productId);
        }
      }
      console.log(this.transactions[this.id]);
    }
  }
  confirmTransaction() {
    this.transactionService.confirmTransaction(this.id, this.listOfProducts);
    this.transactionService.initializeTransaction();
  }
}
