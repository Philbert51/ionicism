import { Service } from '@angular/core';
interface Transactions{
    id: number;
    tanggal: Date;
    totalTransaksi:number;
}
@Service()
export class Transaksi {
   transactions: Transactions[] = [];
}
