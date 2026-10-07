import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-service';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';

// halaman dashboard, menampilkan ringkasan penjualan hari ini dan produk terlaris
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  arrTodaysTransactions: any[] = []; // transaksi hari ini dari service

  todaysRevenue: number = 0; // total pendapatan hari ini
  todaysProfit: number = 0; // total keuntungan hari ini
  todaysTransactionNumber: number = 0; // jumlah transaksi hari ini
  todaysBestSellerProduct: any; // objek produk terlaris hari ini, kosong sampai ada data
  todaysBestSellerQty: number = 0; // jumlah terjual dari produk terlaris hari ini
  numOfProducts: number = 0; // jumlah produk yang belum terhapus
  bestSellerProduct: any; // objek produk terlaris sepanjang waktu, kosong sampai ada data
  bestSellerQty: number = 0; // jumlah terjual dari produk terlaris sepanjang waktu

  adaTodaysBestSeller: boolean = false; // true kalau ada produk terlaris hari ini
  adaAllTimeBestSeller: boolean = false; // true kalau ada produk terlaris sepanjang waktu

  username: string = ''; // nama pengguna yang login, diisi di constructor dari account service

  // angular memberikan service dan router yang dipakai bersama, nama pengguna langsung diambil di sini
  constructor(private transactionservice: TransactionService, private productservice: ProductService, private router: Router, private accountService: AccountService) {
    this.username = this.accountService.getUsername();
  }

  // jalan sekali saat halaman dibuat karena ionic menyimpan halaman di cache, tombol refresh memanggil fungsi ini lagi untuk memuat ulang data
  ngOnInit() {
    this.refreshData();
  }

  // mengisi ulang semua data dashboard dari service
  refreshData() {
    // kalau belum login, arahkan ke halaman login
    // peringatan: fungsi tetap berjalan sampai akhir karena tidak ada return setelah navigate
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }

    // ambil transaksi hari ini
    this.arrTodaysTransactions = this.transactionservice.getTransactionToday();

    // hitung pendapatan, keuntungan, dan jumlah transaksi untuk hari ini
    this.todaysRevenue = this.transactionservice.countRevenue(true);
    this.todaysProfit = this.transactionservice.countProfit(true);
    this.todaysTransactionNumber = this.transactionservice.countNumberOfTransactions(true);

    // cari produk terlaris, false artinya hanya transaksi hari ini
    let todaysBestSeller = this.transactionservice.getBestSellingProduct(false); // berisi object literal yang isinya productId dan totalQty atau null jika tidak ada data transaksi

    // null berarti belum ada penjualan, jadi tidak ada produk terlaris untuk ditampilkan
    if (todaysBestSeller == null) {
      this.adaTodaysBestSeller = false;
    }
    else {
      this.adaTodaysBestSeller = true;

      // ambil objek produk lengkap dari id produk terlaris
      this.todaysBestSellerProduct = this.productservice.getProductById(todaysBestSeller.productId);
      this.todaysBestSellerQty = todaysBestSeller.totalQty;
    }

    // hitung produk yang belum terhapus
    this.numOfProducts = this.productservice.getNotDeletedProductCount();

    // cari produk terlaris sepanjang waktu, true artinya semua transaksi
    let bestSeller = this.transactionservice.getBestSellingProduct(true);

    // null berarti belum ada penjualan sama sekali
    if (bestSeller == null) {
      this.adaAllTimeBestSeller = false;
    }
    else {
      this.adaAllTimeBestSeller = true;

      // ambil objek produk lengkap dari id produk terlaris
      this.bestSellerProduct = this.productservice.getProductById(bestSeller.productId);
      this.bestSellerQty = bestSeller.totalQty;
    }
  }

  // menghitung ulang jumlah produk yang belum terhapus, hasilnya disimpan ke numofproducts lalu dikembalikan
  getNotDeletedProductCount(): number {
    this.numOfProducts = this.productservice.getNotDeletedProductCount();
    return this.numOfProducts;
  }

  // menjumlahkan quantity semua item di semua transaksi hari ini
  countItemsQtyTotal(): number {
    // tidak ada transaksi hari ini, jadi totalnya nol
    if (this.arrTodaysTransactions.length == 0) {
      return 0;
    }
    else {
      let itemCount = 0; // jumlah semua quantity, mulai dari nol

      // perulangan berlapis, transaksi lalu item di dalamnya, for in memberi nomor indeks bukan isinya
      for (let i in this.arrTodaysTransactions) {
        for (let j in this.arrTodaysTransactions[i].produk) {
          let product = this.arrTodaysTransactions[i].produk[j];
          itemCount += product.quantity;
        }
      }
      return itemCount;
    }
  }
}
