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
  
  ngOnInit( ) {
    this.products = this.productService.product;
    this.transactions = this.transactionService.transactions;
    this.cart = this.cartService.cart;
  }
  quantity(index:number): number{
    let jumlah = this.products[index].quantity;
    return jumlah;
  }
  isMaxed(index:number):boolean{
    let qty =  this.products[index].quantity;
    let produkStok = this.products[index].stock;
    if(qty < produkStok ) return false;
    else return true;
  }
  TambahKeKeranjang( p_productId: number, p_productPrice: number){
      let subtotal: number = p_productPrice * this.products[p_productId - 1].quantity;
     
      this.transactionService.initializeTransaction();
      this.transactionService.addToProduct(p_productId,
      this.products[p_productId - 1].purchasePrice,
      this.products[p_productId - 1].sellingPrice,
      this.products[p_productId -1].quantity,
      subtotal
    );
   
    if(this.products[p_productId -1].quantity <= this.products[p_productId - 1].stock){
       this.products[p_productId - 1].stock -= this.products[p_productId -1].quantity;
    }

  }
  TambahQty(index: number){
    let produk = this.products[index];
    let qty = produk.quantity;

    if(qty < produk.stock){
      produk.quantity++;
    }
  }
  KurangQty(index: number){
    let produk = this.products[index];
    let qty = produk.quantity;
    if(qty > 0){
      produk.quantity--;
    }
    else{
      qty = qty;
    }
  }

}
