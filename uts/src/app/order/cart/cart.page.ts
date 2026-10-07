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

  id: number | any = null; // comes from the route as a string, even though it is typed as a number
  products: any[] = []; // all products from the product service
  transactions: any[] = []; // same array object as the service, not a copy

  listOfProducts: any[] = []; // items shown in the cart page
  detailProducts: any[] = []; // full product info for each cart item, same order as the list above
  total: number = 0; // sum of the subtotals of every item in the cart
  // angular hands this page the route info and the shared services
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  // runs once when the page is created and ionic keeps visited pages cached, so values worked out here can go stale
  ngOnInit() {
    // reads the transaction id from the route, it arrives as a string
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    // these are references to the shared service data, not copies
    this.transactions = this.transactionService.transactions;
    this.products = this.productService.product;

    // finds this cart by its id, nothing is found when the id is 0

    let t = this.transactionService.getTransactionById(this.id);


    // same array as the transaction, so an item removed in the service also leaves this list

    if (t != null) {
      this.listOfProducts = t.produk;
    }


    // fills in the product details and the total for the items found above

    this.refreshCart();

  }

  // rebuilds the product details and the total from the items in the cart
  // the details are filled in the same order as the items, the template reads them by position

  refreshCart() {
    this.detailProducts = [];
    this.total = 0;
    for (let i = 0; i < this.listOfProducts.length; i++) {
      let product = this.productService.getProductById(this.listOfProducts[i].id);
      this.detailProducts.push(product);
      this.total += this.listOfProducts[i].subtotal;
    }
  }


  // returns how many of this product are in this cart, 0 when it is not there
  quantity(p_productId: number): number {
    let produk = this.productService.getProductById(p_productId);
    // the route id is a string, the transaction lookup compares loosely so it still matches
    let transaksi = this.transactionService.getTransactionById(this.id);

    let jumlah: number = 0;

    // both lookups can return null, so check before using them
    if (produk != null && transaksi != null) {
      // find the cart line of this product and read its quantity
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          jumlah = transaksi.produk[i].quantity;
        }
      }
    }
    return jumlah;
  }

  // true when the cart quantity is 1 or less, the minus button is disabled with this
  isOne(p_productId: number): Boolean {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    let is1 = false; // stays false when the product is not found in the cart
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          if (transaksi.produk[i].quantity <= 1) {
            is1 = true;
            break; // the product is in the cart once, so stop looking
          }
        }
      }
    }
    return is1;
  }

  // true when the plus button should be disabled
  // warning: produk quantity is the amount chosen on the order page, not the amount in this cart, so this rarely becomes true
  // plus still stops by itself when the stock reaches 0
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

  // adds one to this product in the cart and takes one from the stock, only when stock is left
  plus(p_productId: number) {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (produk != null && transaksi != null) {
      // find the cart line of this product
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          // no stock left means the quantity cannot go up
          if (produk.stock > 0) {
            transaksi.produk[i].quantity++;
            // subtotal is recalculated from the selling price times the new quantity
            transaksi.produk[i].subtotal = transaksi.produk[i].quantity * transaksi.produk[i].sellingPrice;
            produk.stock--;
          }
          break; // the product is in the cart once, so stop looking
        }
      }

      // refreshes the total and the details after the quantity changed

      this.refreshCart();

    }
  }

  // takes one from this product in the cart and gives one back to the stock
  min(p_productId: number) {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          // the quantity never goes below 1, the remove button takes the product out instead
          if (transaksi.produk[i].quantity > 1) {
            transaksi.produk[i].quantity--;
            transaksi.produk[i].subtotal = transaksi.produk[i].quantity * transaksi.produk[i].sellingPrice;
            produk.stock++;
          }
        }
      }

      // refreshes the total and the details after the quantity changed

      this.refreshCart();

    }
  }

  // returns the quantity of this product already in the cart, 0 when it is not there
  checking(p_productId: number): number {
    // let produk = this.productService.getProductById(p_productId); // not used in this method
    let produkQtyInTransaction = 0;
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          produkQtyInTransaction = transaksi.produk[i].quantity;
        }
      }
    }
    return produkQtyInTransaction;
  }

  // takes a product out of the cart and gives its quantity back to the stock
  // the real removal happens in the transaction service
  // warning: the service removes this product id from every transaction that contains it, not only this cart
  removeProduk(p_productId: number) {

    let produk = this.productService.getProductById(p_productId);

    let transaksi = this.transactionService.getTransactionById(this.id);
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        // only call the service when the product really is in this cart
        if (transaksi.produk[i].id == p_productId) {
          // the quantity is read before the removal, afterwards the cart line is gone

          let qty = transaksi.produk[i].quantity;

          this.transactionService.deleteProduk(p_productId);

          // gives the removed quantity back to the stock

          produk.stock += qty;

        }
      }

      // refreshes the total and the details, the list is now one item shorter

      this.refreshCart();

      console.log(this.transactions[this.id]); // debug output only
    }
  }

  // confirms this cart and then opens a fresh empty transaction for the next sale
  // warning: no check for an empty cart, and confirming twice adds the totals twice
  confirmTransaction() {
    // the service adds up the subtotals of the list passed in and marks the transaction completed
    this.transactionService.confirmTransaction(this.id, this.listOfProducts);

    // makes the next active transaction, so the next product added starts a new cart
    this.transactionService.initializeTransaction();
  }
}
