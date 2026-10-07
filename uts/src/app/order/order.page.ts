import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { TransactionService } from '../transaction-service';
import { CartService } from '../cart-service';

// halaman order, tempat memilih produk dan memasukkannya ke keranjang
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage implements OnInit {

  // angular memberikan instance service yang dipakai bersama, jadi semua halaman memakai data yang sama
  // angular hands this page the shared service instances, so every page works on the same data
  constructor(private productService: ProductService,
    private transactionService: TransactionService,
    private cartService: CartService) { }


  // daftar produk yang tampil di layar, diganti hasil pencarian saat sedang mencari
  products: any[] = []; // list shown on screen, swapped for the search result while searching

  // array yang sama dengan milik service, bukan salinan
  transactions: any[] = []; // same array object as the service, not a copy

  // daftar dari cart service, belum dipakai oleh halaman ini
  cart: any[] = []; // list from the cart service, not used by this page yet

  // teks di kotak pencarian, terhubung dua arah dengan ngmodel
  searchQuery: string = ''; // text in the search box, two way bound with ngmodel

  // daftar lengkap disimpan terpisah supaya semua produk bisa dikembalikan saat pencarian dikosongkan
  originalProductList: any[] = []; // full list kept aside so clearing the search can bring everything back

  // ionic menyimpan halaman di cache, jadi fungsi ini hanya jalan sekali dan tidak di setiap kunjungan
  // isinya adalah referensi ke array milik service, bukan salinan
  // ionic caches this page, so this runs once and not on every visit
  // these are references to the service arrays, not copies
  ngOnInit() {
    this.refreshData();
  }

  // mengambil ulang referensi data dari service, juga dipanggil oleh tombol refresh
  refreshData() {
    this.products = this.productService.product;
    this.transactions = this.transactionService.transactions;
    this.originalProductList = this.productService.product;
    this.cart = this.cartService.cart;
  }

  // mengembalikan id transaksi yang belum selesai, dipakai oleh tautan tombol keranjang
  // peringatan: hasilnya 0 kalau tidak ada, dan tidak ada transaksi asli dengan id 0
  // returns the id of the unfinished transaction, the cart button link uses it
  // warning: returns 0 when there is none, and no real transaction has the id 0
  activeTransactionId(): number {
    let id = 0; // id transaksi aktif, tetap 0 kalau tidak ada

    // periksa semua transaksi untuk mencari yang belum selesai
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].isCompleted == false) {
        id = this.transactions[i].id
      }
    }
    return id;
  }

  // mengembalikan jumlah yang dipilih di kartu produk, bukan stok
  // returns the quantity chosen on the product card, this is not the stock
  quantity(p_productId: number): number {
    // getproductbyid bisa mengembalikan null, tanda seru ganda setelah p memberi tahu typescript bahwa produknya pasti ada
    // peringatan: akan error kalau id tidak ditemukan, sama untuk fungsi lain yang memakai tanda seru ganda
    // getproductbyid can return nothing, the !! after p tells typescript the product exists
    // warning: it crashes if the id is not found, same for every other method that uses the !! operator
    let p = this.productService.getProductById(p_productId);
    let jumlah = p!!.quantity;
    return jumlah;
  }

  // true kalau jumlah pilihan sudah mencapai stok, tombol tambah dinonaktifkan dengan ini
  // true when the chosen quantity reached the stock, the plus button is disabled with this
  isMaxed(p_productId: number): boolean {
    let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;
    let produkStok = p!!.stock;

    // kalau masih di bawah stok berarti satu lagi masih boleh dipilih
    // still below the stock means one more can be chosen
    if (qty < produkStok) return false;
    else return true;
  }

  // true kalau jumlah pilihan tinggal satu atau kurang, tombol kurang dinonaktifkan dengan ini
  isOne(p_productId: number): Boolean {
    let p = this.productService.getProductById(p_productId);
    let is1 = false; // hasil pemeriksaan, false sampai terbukti jumlahnya satu atau kurang

    // hanya diperiksa kalau produknya ditemukan
    if (p != null) {
      if (p.quantity <= 1) {
        is1 = true;
      }
    }
    return is1;
  }

  // true kalau tidak ada transaksi yang belum selesai, tombol lihat keranjang dinonaktifkan dengan ini
  isCartEmpty(): Boolean {
    let isEmpty = true; // dianggap kosong sampai ditemukan transaksi yang belum selesai
    for (let i = 0; i < this.transactions.length; i++) {
      // ada transaksi yang belum selesai, berarti keranjang tidak kosong
      if (this.transactions[i].isCompleted == false) {
        isEmpty = false;
      }
    }
    return isEmpty;
  }

  // memasukkan produk dengan jumlah pilihan ke keranjang aktif lalu mengurangi stoknya
  // kalau belum ada keranjang aktif maka dibuat dulu
  TambahKeKeranjang(p_productId: number, p_productPrice: number) {
    let p = this.productService.getProductById(p_productId);
    let subtotal: number = p!!.sellingPrice * p!!.quantity; // harga jual dikali jumlah pilihan

    // pastikan ada keranjang aktif sebelum menambah produk
    this.transactionService.initializeTransaction();

    // tambahkan produk dengan harga dan jumlahnya ke keranjang aktif
    this.transactionService.addToProduct(p_productId,
      p!!.purchasePrice,
      p!!.sellingPrice,
      p!!.quantity,
      subtotal
    );

    // kurangi stok sebesar jumlah yang dimasukkan ke keranjang
    if (p!!.quantity <= p!!.stock) {
      p!!.stock -= p!!.quantity;
    }

    // kalau jumlah pilihan melebihi sisa stok, turunkan jumlah pilihan menjadi sisa stok
    if (p!!.quantity > p!!.stock) {
      p!!.quantity = p!!.stock;
    }
  }

  // menaikkan jumlah pilihan satu, tapi tidak boleh melebihi stok
  TambahQty(p_productId: number) {
    let p = this.productService.getProductById(p_productId);
    let qty = p!!.quantity;

    // jumlah hanya naik kalau masih di bawah stok
    if (qty < p!!.stock) {
      p!!.quantity++;
    }
  }

  // menurunkan jumlah pilihan satu, tapi tidak boleh di bawah nol
  KurangQty(p_productId: number) {
    let p = this.productService.getProductById(p_productId);
    if (p != null) {
      let qty = p.quantity;

      // jumlah hanya turun kalau masih di atas nol
      if (qty > 0) {
        p.quantity--;
      }
      else {
        // tidak melakukan apa pun karena jumlah sudah nol
        qty = qty;
      }
    }
  }


  // true kalau stok habis, tombol tambah ke keranjang dinonaktifkan dengan ini
  isStockEmpty(p_productId: number): Boolean {
    let p = this.productService.getProductById(p_productId);
    if (p!!.stock == 0) return true;
    else return false;
  }


  // dipanggil setiap tombol dilepas di kotak pencarian, daftar produk langsung disaring
  searchProduct() {
    // kotak pencarian kosong, jadi tampilkan semua produk lagi
    if (!this.searchQuery || this.searchQuery.trim() == '') {
      this.products = this.originalProductList;
    } else {
      // ada teks pencarian, jadi tampilkan hanya produk yang cocok
      this.products = this.productService.searchProduct(this.searchQuery);
    }
  }
}
