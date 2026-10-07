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
  products: any[] = [];
  transactions: any[] = [];

  listOfProducts: any[] = [];
  detailProducts: any[] = [];
  total: number = 0;
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

    if (this.id == 0) {
      alert("Keranjang masih kosong!");

    }
    // these are references to the shared service data, not copies
    this.transactions = this.transactionService.transactions;
    this.products = this.productService.product;

    // finds this cart by its id, nothing is found when the id is 0
    let t = this.transactionService.getTransactionById(this.id);

    // same array as the transaction, so an item removed in the service also leaves this list

    if (t != null) {
      this.listOfProducts = t.produk;
      console.log(this.listOfProducts);
    }

    // fills in the product details and the total for the items found above
    this.refreshCart();
    console.log(this.id);
    console.log(this.transactions[this.id]);

  }

  refreshCart() {
    this.detailProducts = [];
    this.total = 0;
    for (let i = 0; i < this.listOfProducts.length; i++) {
      let product = this.productService.getProductById(this.listOfProducts[i].id);
      this.detailProducts.push(product);
      this.total += this.listOfProducts[i].subtotal;
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
      // refreshes the total and the details after the quantity changed
      this.refreshCart();
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
      console.log(this.transactions[this.id]);
    }
  }

  confirmTransaction() {
    let t = this.transactionService.getTransactionById(this.id)
    if (t != null) {
      if (t.produk.length != 0) {
        this.transactionService.confirmTransaction(this.id, this.listOfProducts);
        alert("Berhasil menambahkan transaksi");
      }
      else {
        alert("Keranjang masih kosong!");
      }
    }
  }
}
