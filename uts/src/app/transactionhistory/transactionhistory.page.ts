import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-service';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';

// halaman riwayat transaksi, menampilkan transaksi yang sudah selesai sesuai filter periode
@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.page.html',
  styleUrls: ['./transactionhistory.page.scss'],
  standalone: false,
})
export class TransactionhistoryPage implements OnInit {
  arrBulan: string[] = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]; // nama bulan dalam bahasa indonesia, diakses dengan nomor bulan dari getmonth yang dimulai dari nol
  jenisTampilan: string = "hariini"; // filter periode yang dipilih, nilainya hariini, bulanini, atau filterperiode, terhubung dua arah ke pilihan di layar
  filterBulan: number = 0; // nomor bulan pilihan untuk filter periode, 0 berarti januari
  currentDate = new Date(); // tanggal dan waktu saat halaman dibuat, diganti dengan yang terbaru saat memilih bulan ini
  currentYear: number = this.currentDate.getFullYear(); // tahun dari tanggal sekarang
  filterTahun: number = this.currentYear; // tahun pilihan untuk filter periode, awalnya tahun sekarang dan diubah tombol tahun sebelumnya dan sesudahnya
  adaData: boolean = false; // true kalau ada transaksi untuk ditampilkan, false memunculkan tulisan tidak ada transaksi

  transactions: any[] = []; // daftar transaksi yang tampil di layar, isinya objek transaksi dari service
  totalRevenue: number = 0; // total pendapatan untuk periode yang tampil
  totalProfit: number = 0; // total keuntungan untuk periode yang tampil
  numOfTransactions: number = 0; // jumlah transaksi yang selesai pada periode yang tampil

  // angular memberikan instance service dan router yang dipakai bersama
  constructor(private transactionservice: TransactionService, private router: Router, private accountService: AccountService) { }

  // ionic menyimpan halaman di cache, jadi fungsi ini hanya jalan sekali dan tidak di setiap kunjungan
  ngOnInit() {
    this.refreshData();
  }

  // memuat ulang transaksi hari ini, juga dipanggil oleh tombol refresh
  refreshData() {
    // kalau belum login, arahkan ke halaman login
    // peringatan: fungsi tetap berjalan sampai akhir karena tidak ada return setelah navigate
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }
    // Default tampilkan transaksi HARI INI
    this.transactions = this.transactionservice.getTransactionToday();

    // hitung total pendapatan, keuntungan, dan jumlah transaksi untuk hari ini
    this.totalRevenue = this.transactionservice.countRevenue(true);
    this.totalProfit = this.transactionservice.countProfit(true);
    this.numOfTransactions = this.transactionservice.countNumberOfTransactions(true);
    const tempCompleted: any[] = []; // menampung transaksi hari ini yang sudah selesai

    // saring hanya transaksi yang sudah selesai, keranjang yang belum selesai tidak ditampilkan
    for (const t of this.transactions) {
      if (t.isCompleted) {
        tempCompleted.push(t);
      }
    }

    // ganti daftar yang tampil dengan hasil saringan
    this.transactions = tempCompleted;

    // tandai ada tidaknya data, dipakai layar untuk memilih antara daftar dan pesan kosong
    if (this.transactions.length == 0) {
      this.adaData = false;
    }
    else {
      this.adaData = true;
    }
  }

  // jalan setiap kali halaman ditampilkan lagi, jadi data ikut diperbarui saat kembali dari halaman lain
  ionViewDidEnter() {
    this.changePeriodFilter();
  }

  // mundur satu tahun lalu hitung ulang data
  yearBefore() {
    this.filterTahun--;
    this.changePeriodFilter();
  }

  // maju satu tahun lalu hitung ulang data
  yearAfter() {
    this.filterTahun++;
    this.changePeriodFilter();
  }

  // mengisi daftar transaksi dan semua total sesuai filter periode yang dipilih
  changePeriodFilter() {
    if (this.jenisTampilan == "hariini") {
      // filter hari ini
      this.transactions = this.transactionservice.getTransactionToday();
      this.totalRevenue = this.transactionservice.countRevenue(true);
      this.totalProfit = this.transactionservice.countProfit(true);
      this.numOfTransactions = this.transactionservice.countNumberOfTransactions(true);
    }
    else if (this.jenisTampilan == "bulanini") {
      // filter bulan ini, tanggal diambil ulang supaya bulan dan tahunnya terbaru
      this.currentDate = new Date();
      this.transactions = this.transactionservice.getTransactionFiltered(this.currentDate.getMonth(), this.currentDate.getFullYear());
      this.totalRevenue = this.transactionservice.countRevenue(false, this.currentDate.getMonth(), this.currentDate.getFullYear());
      this.totalProfit = this.transactionservice.countProfit(false, this.currentDate.getMonth(), this.currentDate.getFullYear());
      this.numOfTransactions = this.transactionservice.countNumberOfTransactions(false, this.currentDate.getMonth(), this.currentDate.getFullYear());
    }
    else {
      // filter periode, memakai bulan dan tahun pilihan
      this.transactions = this.transactionservice.getTransactionFiltered(this.filterBulan, this.filterTahun);
      this.totalRevenue = this.transactionservice.countRevenue(false, this.filterBulan, this.filterTahun);
      this.totalProfit = this.transactionservice.countProfit(false, this.filterBulan, this.filterTahun);
      this.numOfTransactions = this.transactionservice.countNumberOfTransactions(false, this.filterBulan, this.filterTahun);
    }

    // tandai ada tidaknya data, dipakai layar untuk memilih antara daftar dan pesan kosong
    if (this.transactions.length == 0) {
      this.adaData = false;
    }
    else {
      this.adaData = true;
    }
  }

  // mengubah tanggal menjadi teks, contohnya 5 oktober 2026, 09:05
  formatDate(tanggal: Date): string {
    const hari = tanggal.getDate();
    const bulan = tanggal.getMonth();
    const tahun = tanggal.getFullYear();
    const jam = tanggal.getHours();
    let jamFormatted: string = ""; // jam dalam dua digit

    // tambahkan angka nol di depan kalau jam di bawah sepuluh supaya tetap dua digit
    if (jam < 10) {
      jamFormatted = "0" + jam;
    }
    else {
      jamFormatted = jam.toString();
    }
    const menit = tanggal.getMinutes();
    let menitFormatted = ""; // menit dalam dua digit

    // tambahkan angka nol di depan kalau menit di bawah sepuluh supaya tetap dua digit
    if (menit < 10) {
      menitFormatted = "0" + menit;
    }
    else {
      menitFormatted = menit.toString();
    }

    // susun semua bagian menjadi satu teks, nama bulan diambil dari arrbulan memakai nomor bulan
    return hari + " " + this.arrBulan[bulan] + " " + tahun + ", " + jamFormatted + ":" + menitFormatted;
  }

  // menjumlahkan quantity semua item di satu transaksi
  countItemsQtyTotal(transaction: any): number {
    let total = 0; // jumlah semua quantity, mulai dari nol

    // for in memberi nomor indeks, bukan isinya, jadi item diambil dengan produk[i]
    for (let i in transaction.produk) {
      total += transaction.produk[i].quantity;
    }
    return total;
  }

  // pindah ke halaman order untuk membuat transaksi baru
  addTransaction() {
    this.router.navigate(['/order']);
  }
}
