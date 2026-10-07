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


  products: any[] = []; // list shown on screen, swapped for the search result while searching
  transactions: any[] = []; // same array object as the service, not a copy
  cart: any[] = []; // list from the cart service, not used by this page yet
  searchQuery: string = ''; // text in the search box, two way bound with ngmodel
  originalProductList: any[] = []; // full list kept aside so clearing the search can bring everything back

  // ionic caches this page, so this runs once and not on every visit
  // these are references to the service arrays, not copies
  ngOnInit() {
    this.products = this.productService.product;
    this.transactions = this.transactionService.transactions;
    this.originalProductList = this.productService.product;
    this.cart = this.cartService.cart;
  }

  // returns the id of the unfinished transaction, the cart button link uses it
  // warning: returns 0 when there is none, and no real transaction has the id 0
  activeTransactionId(): number {
    let id = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].isCompleted == false) {
        id = this.transactions[i].id
      }
    }
    return id;
  }

  // returns the quantity chosen on the product card, this is not the stock
  quantity(p_productId: number): number {
    // getproductbyid can return nothing, the !! after p tells typescript the product exists
    // warning: it crashes if the id is not found, same for every method below
    let p = this.productService.getProductById(p_productId);
    let jumlah = p!!.quantity;
    return jumlah;
  }

  // true when the chosen quantity reached the stock, the plus button is disabled with this
  isMaxed(p_productId: number): boolean {
    let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;
    let produkStok = p!!.stock;
    // still below the stock means one more can be chosen
    if (qty < produkStok) return false;
    else return true;
  }

  isOne(p_productId: number):Boolean{
    let p = this.productService.getProductById(p_productId);
    let is1 = false;
    if(p != null){
      if(p.quantity == 1){
        is1 = true;
      }
    }
    return is1;
  }
  isCartEmpty(): Boolean {
    let isEmpty = true;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].isCompleted == false) {
        isEmpty = false;
      }
    }
    return isEmpty;
  }
  TambahKeKeranjang(p_productId: number, p_productPrice: number) {
    let p = this.productService.getProductById(p_productId);
    let subtotal: number = p!!.sellingPrice * p!!.quantity;
    this.transactionService.initializeTransaction();

    this.transactionService.addToProduct(p_productId,
      p!!.purchasePrice,
      p!!.sellingPrice,
      p!!.quantity,
      subtotal
    );

    if (p!!.quantity <= p!!.stock) {
      p!!.stock -= p!!.quantity;
    }

    if (p!!.quantity > p!!.stock) {
      p!!.quantity = p!!.stock;
    }
  }

  TambahQty(p_productId: number) {
    let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;

    if (qty < p!!.stock) {
      p!!.quantity++;
    }
  }

  KurangQty(p_productId: number) {
    let p = this.productService.getProductById(p_productId);
    if (p != null) {
      let qty = p.quantity;
      if (qty > 0) {
        p.quantity--;
      }
      else {
        qty = qty;
      }
    }
  }


  isStockEmpty(p_productId: number): Boolean {
    let p = this.productService.getProductById(p_productId);
    if (p!!.stock == 0) return true;
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
