import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product-service';
import { TransactionService } from '../../transaction-service';

// halaman keranjang, menampilkan isi satu transaksi yang belum selesai
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {

  // id transaksi dari route, datang sebagai string meskipun tipenya angka
  id: number | any = null; // comes from the route as a string, even though it is typed as a number

  // semua produk dari product service
  products: any[] = []; // all products from the product service

  // array yang sama dengan milik service, bukan salinan
  transactions: any[] = []; // same array object as the service, not a copy

  listOfProducts: any[] = []; // baris produk di transaksi ini, array yang sama dengan milik transaksi
  detailProducts: any[] = []; // detail produk untuk setiap baris, urutannya sama dengan listofproducts karena template membacanya berdasarkan posisi
  total: number = 0; // total harga semua baris, dihitung ulang oleh refreshcart

  // route untuk membaca id dari alamat, dua service untuk data produk dan transaksi
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  // dijalankan sekali saat halaman dibuat, dan ionic menyimpan halaman di cache, jadi nilai yang dihitung di sini bisa menjadi usang
  // runs once when the page is created and ionic keeps visited pages cached, so values worked out here can go stale
  ngOnInit() {
    // membaca id transaksi dari route, datang sebagai string
    // reads the transaction id from the route, it arrives as a string
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    // id 0 berarti tidak ada keranjang aktif, jadi beri tahu pengguna
    if (this.id == 0) {
      alert("Keranjang masih kosong!");

    }

    // ini referensi ke data service yang dipakai bersama, bukan salinan
    // these are references to the shared service data, not copies
    this.transactions = this.transactionService.transactions;
    this.products = this.productService.product;

    // finds this cart by its id, nothing is found when the id is 0

    // mencari keranjang ini dari id nya, tidak ketemu kalau id nya 0
    let t = this.transactionService.getTransactionById(this.id);


    // same array as the transaction, so an item removed in the service also leaves this list

    // array yang sama dengan milik transaksi, jadi barang yang dihapus di service ikut hilang dari daftar ini
    if (t != null) {
      this.listOfProducts = t.produk;
      console.log(this.listOfProducts);
    }


    // fills in the product details and the total for the items found above

    // mengisi detail produk dan total dari barang yang ditemukan di atas
    this.refreshCart();

  }

  // rebuilds the product details and the total from the items in the cart
  // the details are filled in the same order as the items, the template reads them by position

  // menyusun ulang detail produk dan total dari isi keranjang
  // detail diisi dengan urutan yang sama dengan barangnya karena template membacanya berdasarkan posisi
  refreshCart() {
    // kosongkan dulu supaya tidak menumpuk dengan hasil sebelumnya
    this.detailProducts = [];
    this.total = 0;

    // untuk setiap baris, ambil detail produknya dan tambahkan subtotalnya ke total
    for (let i = 0; i < this.listOfProducts.length; i++) {
      let product = this.productService.getProductById(this.listOfProducts[i].id);
      this.detailProducts.push(product);
      this.total += this.listOfProducts[i].subtotal;
    }
  }


  // mengambil jumlah produk ini di keranjang, 0 kalau tidak ada
  quantity(p_productId: number): number {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);

    let jumlah: number = 0; // jumlah di keranjang, 0 kalau produk tidak ketemu

    // hanya dicari kalau produk dan transaksinya ada
    if (produk != null && transaksi != null) {
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          jumlah = transaksi.produk[i].quantity;
        }
      }
    }
    return jumlah;
  }

  // true kalau jumlah produk di keranjang tinggal satu atau kurang, tombol kurang dinonaktifkan dengan ini
  isOne(p_productId: number): Boolean {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    let is1 = false; // hasil pemeriksaan, false sampai terbukti jumlahnya satu atau kurang
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

  // true kalau stok produk sudah habis, tombol tambah dinonaktifkan dengan ini
  isMaxed(p_productId: number): Boolean {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    let isMax = false;
    if (produk != null && transaksi != null) {
      // stok nol berarti tidak ada lagi yang bisa ditambahkan
      if(produk.stock == 0){
            isMax = true;
          }
    }
    return isMax;
  }

  // menaikkan jumlah produk di keranjang satu dan mengurangi stoknya satu
  plus(p_productId: number) {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (produk != null && transaksi != null) {
      // cari baris produk yang sama
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          // hanya naik kalau stok masih ada
          if (produk.stock > 0) {
            // naikkan jumlah, hitung ulang subtotal, lalu kurangi stok
            transaksi.produk[i].quantity++;
            transaksi.produk[i].subtotal = transaksi.produk[i].quantity * transaksi.produk[i].sellingPrice;
            produk.stock--;
          }

          // berhenti setelah baris yang cocok diproses
          break;
        }
      }
      // refreshes the total and the details after the quantity changed

      // hitung ulang total dan detail setelah jumlah berubah
      this.refreshCart();

    }
  }

  // menurunkan jumlah produk di keranjang satu dan mengembalikan stoknya satu
  min(p_productId: number) {
    let produk = this.productService.getProductById(p_productId);
    let transaksi = this.transactionService.getTransactionById(this.id);
    if (produk != null && transaksi != null) {
      // cari baris produk yang sama
      for (let i = 0; i < transaksi.produk.length; i++) {
        if (transaksi.produk[i].id == p_productId) {
          // jumlah hanya turun kalau masih di atas satu, untuk menghapus baris dipakai tombol remove
          if (transaksi.produk[i].quantity > 1) {
            transaksi.produk[i].quantity--;
            transaksi.produk[i].subtotal = transaksi.produk[i].quantity * transaksi.produk[i].sellingPrice;
            produk.stock++;
          }
        }
      }
      // refreshes the total and the details after the quantity changed

      // hitung ulang total dan detail setelah jumlah berubah
      this.refreshCart();

    }
  }

  // mengembalikan jumlah produk ini yang sudah ada di keranjang, 0 kalau tidak ada
  // returns the quantity of this product already in the cart, 0 when it is not there
  checking(p_productId: number): number {
    // let produk = this.productService.getProductById(p_productId); // not used in this method
    let produkQtyInTransaction = 0; // jumlah di keranjang, mulai dari nol
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

  // mengeluarkan produk dari keranjang dan mengembalikan jumlahnya ke stok
  // penghapusan sebenarnya dilakukan di transaction service, hanya pada transaksi ini
  // takes a product out of the cart and gives its quantity back to the stock
  // the real removal happens in the transaction service
  removeProduk(p_productId: number) {
    let produk = this.productService.getProductById(p_productId);

    let transaksi = this.transactionService.getTransactionById(this.id);

    // hanya lanjut kalau produk dan transaksinya ada
    if (produk != null && transaksi != null) {
      // cari baris produk yang akan dihapus
      for (let i = 0; i < transaksi.produk.length; i++) {
        // service hanya dipanggil kalau produknya benar benar ada di keranjang ini
        // only call the service when the product really is in this cart
        if (transaksi.produk[i].id == p_productId) {
          let qty = transaksi.produk[i].quantity; // jumlah yang akan dikembalikan ke stok, dibaca sebelum baris dihapus
          this.transactionService.deleteProduk(p_productId, transaksi.id);

          // kembalikan jumlahnya ke stok produk
          produk.stock += qty;

        }
      }

      // refreshes the total and the details, the list is now one item shorter

      // hitung ulang total dan detail karena daftar sekarang kurang satu
      this.refreshCart();

      // hanya untuk debug
      console.log(this.transactions[this.id]); // debug output only
    }
  }

  // mengonfirmasi keranjang ini kalau ada isinya, kalau kosong hanya menampilkan peringatan
  confirmTransaction() {
    let t = this.transactionService.getTransactionById(this.id) // transaksi keranjang ini, bisa null
    if (t != null) {
      // hanya bisa dikonfirmasi kalau keranjang punya isi
      if (t.produk.length != 0) {
        // service menjumlahkan subtotal dan menandai transaksi selesai
        this.transactionService.confirmTransaction(this.id, this.listOfProducts);
        alert("Berhasil menambahkan transaksi");
      }
      else {
        alert("Keranjang masih kosong!");
      }
    }
  }
}
