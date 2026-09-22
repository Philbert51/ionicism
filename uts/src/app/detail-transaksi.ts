import { Service } from '@angular/core';
interface TransactionDetail {
        transactionId: number;
        productId: number;
        quantity: number;
        }
@Service()
export class DetailTransaksi {
    transactionDetail: TransactionDetail[] = [];
}
