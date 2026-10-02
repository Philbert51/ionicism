import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.page.html',
  styleUrls: ['./transactionhistory.page.scss'],
  standalone: false,
})
export class TransactionhistoryPage implements OnInit {
  arrBulan:string[] = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  jenisTampilan:string = "hariini";
  filterBulan:number = 1;
  currentDate = new Date();
  currentYear:number = this.currentDate.getFullYear();
  filterTahun:number = this.currentYear;
  
  constructor() { }

  ngOnInit() {
  }

  yearBefore(){
    this.filterTahun--;
  }

  yearAfter(){
    this.filterTahun++;
  }
}
