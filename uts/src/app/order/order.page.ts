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

  // angular hands this page the shared service instances, so every page works on the same data
  constructor(private productService: ProductService, 
    private transactionService: TransactionService,
  private cartService: CartService) { }

 
  products:any[] = []; // list shown on screen, swapped for the search result while searching
  transactions:any[]=[]; // same array object as the service, not a copy
  cart:any[]=[]; // list from the cart service, not used by this page yet
  searchQuery: string =''; // text in the search box, two way bound with ngmodel
  originalProductList: any[]=[]; // full list kept aside so clearing the search can bring everything back
  
  // ionic caches this page, so this runs once and not on every visit
  // these are references to the service arrays, not copies
  ngOnInit( ) {
    this.products = this.productService.product;
    this.transactions = this.transactionService.transactions;
    this.originalProductList = this.productService.product;
    this.cart = this.cartService.cart;
  }

  // returns the id of the unfinished transaction, the cart button link uses it
  // warning: returns 0 when there is none, and no real transaction has the id 0
  activeTransactionId(): number{
    let id = 0; // 0 means no active transaction found

    // goes through every transaction and keeps the id of the last unfinished one
    for(let i = 0; i < this.transactions.length; i++){
      if(this.transactions[i].isCompleted == false){
        id = this.transactions[i].id
      }
    }
    return id;
  }

  // returns the quantity chosen on the product card, this is not the stock
  quantity(p_productId:number): number{
    // getproductbyid can return nothing, the !! after p tells typescript the product exists
    // warning: it crashes if the id is not found, same for every method below
    let p = this.productService.getProductById(p_productId);
    let jumlah = p!!.quantity;
    return jumlah;
  }

  // true when the chosen quantity reached the stock, the plus button is disabled with this
  isMaxed(p_productId:number):boolean{
    let p = this.productService.getProductById(p_productId);
    let qty =  p!!.quantity;
    let produkStok = p!!.stock;
    // still below the stock means one more can be chosen
    if(qty < produkStok ) return false;
    else return true;
  }

  // adds the chosen quantity of a product into the active transaction
  // warning: the price parameter is not used, the price is read from the product itself
  // warning: a chosen quantity of 0 is not blocked, it adds an empty line to the cart
  TambahKeKeranjang( p_productId: number, p_productPrice: number){
      let p = this.productService.getProductById(p_productId);

      // subtotal is the selling price times the chosen quantity
      let subtotal: number = p!!.sellingPrice * p!!.quantity;

      // opens a new active transaction only when there is none yet
      this.transactionService.initializeTransaction();

      // puts the product in the active transaction, or adds to it when it is already there
      this.transactionService.addToProduct(p_productId,
      p!!.purchasePrice,
      p!!.sellingPrice,
      p!!.quantity,
      subtotal
    );
   
    // take the added quantity out of the stock, only when there is enough stock
    if(p!!.quantity <= p!!.stock){
       p!!.stock -= p!!.quantity;
    }

    // if less stock is left than the chosen quantity, lower the quantity to match the stock
    if(p!!.quantity > p!!.stock){
      p!!.quantity = p!!.stock;
    }
  }

  // plus button, raises the chosen quantity by one but never above the stock
  TambahQty(p_productId: number){
     let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;

    if(qty < p!!.stock){
      p!!.quantity++;
    }
  }

  // minus button, lowers the chosen quantity by one but never below zero
  KurangQty(p_productId: number){
    let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;
    if(qty > 0){
      p!!.quantity--;
    }
    else{
      qty = qty; // does nothing, the quantity just stays at zero
    }
  }

  // true when the product has no stock left, the add button is disabled with this
  isStockEmpty(p_productId: number): Boolean{
      let p = this.productService.getProductById(p_productId);
      if(p!!.stock == 0) return true;
      else return false;
  }

  // runs on every keyup in the search box, an empty search brings back the full list
  searchProduct() {
    if (!this.searchQuery || this.searchQuery.trim() == '') {
      this.products = this.originalProductList;
    } else {
     // the service returns a new filtered list, the original list stays untouched
     this.products = this.productService.searchProduct(this.searchQuery);
    }
  }
}
