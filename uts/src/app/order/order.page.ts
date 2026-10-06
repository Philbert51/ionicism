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
    let p = this.productService.getProductById(p_productId);
    let jumlah = p!!.quantity;
    return jumlah;
  }
  isMaxed(p_productId:number):boolean{
    let p = this.productService.getProductById(p_productId);
    let qty =  p!!.quantity;
    let produkStok = p!!.stock;
    if(qty < produkStok ) return false;
    else return true;
  }
  TambahKeKeranjang( p_productId: number, p_productPrice: number){
      let p = this.productService.getProductById(p_productId);
      let subtotal: number = p!!.sellingPrice * p!!.quantity;
      this.transactionService.initializeTransaction();
      this.transactionService.addToProduct(p_productId,
      p!!.purchasePrice,
      p!!.sellingPrice,
      p!!.quantity,
      subtotal
    );
   
    if(p!!.quantity <= p!!.stock){
       p!!.stock -= p!!.quantity;
    }

    if(p!!.quantity > p!!.stock){
      p!!.quantity = p!!.stock;
    }
  }
  TambahQty(p_productId: number){
     let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;

    if(qty < p!!.stock){
      p!!.quantity++;
    }
  }
  KurangQty(p_productId: number){
    let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;
    if(qty > 0){
      p!!.quantity--;
    }
    else{
      qty = qty;
    }
  }

  isStockEmpty(p_productId: number): Boolean{
      let p = this.productService.getProductById(p_productId);
      if(p!!.stock == 0) return true;
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
