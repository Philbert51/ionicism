import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../transaction-service';
import { ProductService } from '../../product-service';
import { Router } from '@angular/router';
import { AccountService } from '../../account-service';

// halaman detail satu transaksi, id transaksi diambil dari parameter rute
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {
  transaction: any; // objek transaksi yang dibuka, diisi dari service di ngoninit dan null kalau tidak ditemukan
  productDetail: any[] = []; // menampung detail produk (nama produk, gambar, dll)
  adaData: boolean = false; // true kalau transaksi ditemukan, false memunculkan tulisan data tidak ditemukan

  // angular memberikan route, service, dan router yang dipakai bersama
  constructor(private route: ActivatedRoute, private transactionservice: TransactionService, private productservice: ProductService, private router: Router, private accountService: AccountService) { }

  id = 0; // id transaksi yang dibuka, diisi dari parameter rute

  // jalan saat halaman dibuat, memuat transaksi beserta detail produknya
  ngOnInit() {
    // kalau belum login, arahkan ke halaman login
    // peringatan: fungsi tetap berjalan sampai akhir karena tidak ada return setelah navigate
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }

    // params langsung memberi nilai saat disubscribe, jadi id sudah terisi di baris berikutnya
    this.route.params.subscribe(params => {
      // nilai dari url berupa string walaupun id dideklarasikan sebagai number
      this.id = params['id'];
    });
    // Ambil transaksi berdasarkan id
    this.transaction = this.transactionservice.getTransactionById(this.id);

    // tandai transaksi ditemukan atau tidak
    if (this.transaction == null) {
      this.adaData = false;
    }
    else {
      this.adaData = true;
    }

    // peringatan: error kalau transaksi null karena produk dibaca tanpa memeriksa adadata
    // for in memberi nomor indeks, bukan isinya, jadi item diambil dengan produk[i]
    // Ambil detail produk yg sesuai berdasarkan id item transaksi
    for (let i in this.transaction.produk) {
      let id = this.transaction.produk[i].id;
      let product = this.productservice.getProductById(id)

      // simpan detail produk, urutannya sama dengan urutan item di transaksi
      this.productDetail.push(product);
    }
  }

  // mengubah tanggal menjadi teks, contohnya 5 oktober 2026, 09:05
  formatDate(tanggal: Date): string {
    const arrBulan: string[] = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]; // nama bulan dalam bahasa indonesia, diakses dengan nomor bulan dari getmonth yang dimulai dari nol
    const hari = tanggal.getDate();
    const bulan = tanggal.getMonth();
    const tahun = tanggal.getFullYear();
    const jam = tanggal.getHours();
    let jamFormatted:string = ""; // jam dalam dua digit

    // tambahkan angka nol di depan kalau jam di bawah sepuluh supaya tetap dua digit
    if (jam < 10){
      jamFormatted = "0" + jam;
    }
    else{
      jamFormatted = jam.toString();
    }
    const menit = tanggal.getMinutes();
    let menitFormatted = ""; // menit dalam dua digit

    // tambahkan angka nol di depan kalau menit di bawah sepuluh supaya tetap dua digit
    if (menit < 10){
      menitFormatted = "0" + menit;
    }
    else{
      menitFormatted = menit.toString();
    }

    // susun semua bagian menjadi satu teks, nama bulan diambil dari arrbulan memakai nomor bulan
    return hari + " " + arrBulan[bulan] + " " + tahun + ", " + jamFormatted + ":" + menitFormatted;
  }

  // menjumlahkan quantity semua item di transaksi ini
  countItemsQtyTotal(): number {
    let total = 0; // jumlah semua quantity, mulai dari nol

    // for in memberi nomor indeks, bukan isinya, jadi item diambil dengan produk[i]
    for (let i in this.transaction.produk) {
      total += this.transaction.produk[i].quantity;
    }
    return total;
  }

  // menjumlahkan keuntungan semua item di transaksi ini
  countTotalProfit(): number {
    let profit = 0; // total keuntungan, mulai dari nol
    for (let i in this.transaction.produk) {
      let item = this.transaction.produk[i];

      // keuntungan satu item adalah harga jual dikurangi harga beli, dikali jumlahnya
      profit += (item.sellingPrice - item.purchasePrice) * item.quantity;
    }
    return profit;
  }
}
