import { Service } from '@angular/core';

interface Transactions{
    id: number;
    tanggal: Date;
    totalTransaksi:number;
    produk: [
        {
            id: number,
            quantity: number,
            subtotal: number,
        }
    ];
}

@Service()
export class TransactionService {
    transactions: Transactions[] = [];
}
