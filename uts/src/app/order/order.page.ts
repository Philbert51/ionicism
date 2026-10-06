import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { TransactionService } from '../transaction-service';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage implements OnInit {

  constructor(private productService: ProductService, 
    private transactionService: TransactionService,
  private cartService: CartService) { }

 
  products:any[] = [];
  transactions:any[]=[];
  cart:any[]=[];
  searchQuery: string ='';
  originalProductList: any[]=[];
  ngOnInit( ) {
    this.products = this.productService.product;
    this.transactions = this.transactionService.transactions;
    this.originalProductList = this.productService.product;
    this.cart = this.cartService.cart;
  }
  quantity(p_productId:number): number{
    let produk;
      for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id == p_productId){
          produk = this.products[i];
          break;
        }
      }
    let jumlah = produk.quantity;
    return jumlah;
  }
  isMaxed(p_productId:number):boolean{
    let produk;
      for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id == p_productId){
          produk = this.products[i];
          break;
        }
      }
    let qty =  produk.quantity;
    let produkStok = produk.stock;
    if(qty < produkStok ) return false;
    else return true;
  }
  TambahKeKeranjang( p_productId: number, p_productPrice: number){
      let produk;
      for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id == p_productId){
          produk = this.products[i];
          break;
        }
      }
      let subtotal: number = produk.sellingPrice * produk.quantity;
      this.transactionService.initializeTransaction();
      this.transactionService.addToProduct(p_productId,
      produk.purchasePrice,
      produk.sellingPrice,
      produk.quantity,
      subtotal
    );
   
    if(produk.quantity <= produk.stock){
       produk.stock -= produk.quantity;
    }

  }
  TambahQty(p_productId: number){
     let produk;
      for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id == p_productId){
          produk = this.products[i];
          break;
        }
      }
    let qty = produk.quantity;

    if(qty < produk.stock){
      produk.quantity++;
    }
  }
  KurangQty(p_productId: number){
    let produk;
      for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id == p_productId){
          produk = this.products[i];
          break;
        }
      }
    let qty = produk.quantity;
    if(qty > 0){
      produk.quantity--;
    }
    else{
      qty = qty;
    }
  }

  isStockEmpty(p_productId: number): Boolean{
    let produk;
      for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id == p_productId){
          produk = this.products[i];
          break;
        }
      }
      if(produk.stock == 0) return true;
      else return false;
  }
  searchProduct() {
    if (!this.searchQuery || this.searchQuery.trim() == '') {
      this.products = this.originalProductList;
    } else {
     this.products = this.productService.searchProduct(this.searchQuery);
    }
  }
}
