import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-service';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.page.html',
  styleUrls: ['./transactionhistory.page.scss'],
  standalone: false,
})
export class TransactionhistoryPage implements OnInit {
  arrBulan: string[] = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  jenisTampilan: string = "hariini";
  filterBulan: number = 0;
  currentDate = new Date();
  currentYear: number = this.currentDate.getFullYear();
  filterTahun: number = this.currentYear;
  adaData: boolean = false;

  transactions: any[] = [];
  totalRevenue: number = 0;
  totalProfit: number = 0;
  numOfTransactions: number = 0;

  constructor(private transactionservice: TransactionService, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }
    // Default tampilkan transaksi HARI INI
    this.transactions = this.transactionservice.getTransactionToday();
    this.totalRevenue = this.transactionservice.countRevenue(true);
    this.totalProfit = this.transactionservice.countProfit(true);
    this.numOfTransactions = this.transactionservice.countNumberOfTransactions(true);
    const tempCompleted : any[] = [];
    for (const t of this.transactions) {
      if (t.isCompleted) {
        tempCompleted.push(t);
      }
    }
    this.transactions = tempCompleted;
    if (this.transactions.length == 0) {
      this.adaData = false;
    }
    else {
      this.adaData = true;
    }
  }

  ionViewDidEnter(){
    this.changePeriodFilter();
  }
  
  yearBefore() {
    this.filterTahun--;
    this.changePeriodFilter();
  }

  yearAfter() {
    this.filterTahun++;
    this.changePeriodFilter();
  }

  changePeriodFilter() {
    if (this.jenisTampilan == "hariini") {
      this.transactions = this.transactionservice.getTransactionToday();
      this.totalRevenue = this.transactionservice.countRevenue(true);
      this.totalProfit = this.transactionservice.countProfit(true);
      this.numOfTransactions = this.transactionservice.countNumberOfTransactions(true);
    }
    else if (this.jenisTampilan == "bulanini") {
      this.currentDate = new Date();
      this.transactions = this.transactionservice.getTransactionFiltered(this.currentDate.getMonth(), this.currentDate.getFullYear());
      this.totalRevenue = this.transactionservice.countRevenue(false, this.currentDate.getMonth(), this.currentDate.getFullYear());
      this.totalProfit = this.transactionservice.countProfit(false, this.currentDate.getMonth(), this.currentDate.getFullYear());
      this.numOfTransactions = this.transactionservice.countNumberOfTransactions(false, this.currentDate.getMonth(), this.currentDate.getFullYear());
    }
    else {
      this.transactions = this.transactionservice.getTransactionFiltered(this.filterBulan, this.filterTahun);
      this.totalRevenue = this.transactionservice.countRevenue(false, this.filterBulan, this.filterTahun);
      this.totalProfit = this.transactionservice.countProfit(false, this.filterBulan, this.filterTahun);
      this.numOfTransactions = this.transactionservice.countNumberOfTransactions(false, this.filterBulan, this.filterTahun);
    }

    if (this.transactions.length == 0) {
      this.adaData = false;
    }
    else {
      this.adaData = true;
    }
  }

  formatDate(tanggal: Date): string {
    const hari = tanggal.getDate();
    const bulan = tanggal.getMonth();
    const tahun = tanggal.getFullYear();
    const jam = tanggal.getHours();
    let jamFormatted:string = "";
    if (jam < 10){
      jamFormatted = "0" + jam;
    }
    else{
      jamFormatted = jam.toString();
    }
    const menit = tanggal.getMinutes();
    let menitFormatted = "";
    if (menit < 10){
      menitFormatted = "0" + menit;
    }
    else{
      menitFormatted = menit.toString();
    }
    return hari + " " + this.arrBulan[bulan] + " " + tahun + ", " + jamFormatted + ":" + menitFormatted;
  }

  countItemsQtyTotal(transaction:any): number {
    let total = 0;
    for (let i in transaction.produk) {
      total += transaction.produk[i].quantity;
    }
    return total;
  }

  addTransaction() {
    this.router.navigate(['/order']);
  }
}
