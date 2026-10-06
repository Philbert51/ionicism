import { Service } from '@angular/core';

interface Transactions {
    id: number;
    tanggal: Date;
    totalTransaksi: number;
    isCompleted: boolean;
    // produk: [
    //     {
    //         id: number,
    //         quantity: number,
    //         subtotal: number,
    //     }
    // ];
    // Andrea edit from Abi
    produk: Product[];
}

// Andrea edit
interface Product {
    id: number,
    purchasePrice: number,
    sellingPrice: number,
    quantity: number,
    subtotal: number,
}

@Service()
export class TransactionService {
    // Dummy Data by Andrea
    transactions: Transactions[] = [
        {
            id: 1,
            tanggal: new Date('2026-10-06'), // YYYY-MM-DD
            totalTransaksi: 1999.97,
            isCompleted: true,
            produk: [
                {
                    id: 1,
                    purchasePrice: 499.99,
                    sellingPrice: 699.99,
                    quantity: 2,
                    subtotal: 1399.98,
                },
                {
                    id: 3,
                    purchasePrice: 399.99,
                    sellingPrice: 599.99,
                    quantity: 1,
                    subtotal: 599.99,
                }
            ]
        },
        {
            id: 2,
            tanggal: new Date('2026-10-26'), // YYYY-MM-DD
            totalTransaksi: 1599.98,
            isCompleted: true,
            produk: [
                {
                    id: 2,
                    purchasePrice: 599.99,
                    sellingPrice: 799.99,
                    quantity: 2,
                    subtotal: 1599.98,
                }
            ]
        },
        {
            id: 3,
            tanggal: new Date('2025-09-03'), // YYYY-MM-DD
            totalTransaksi: 1999.97,
            isCompleted: true,
            produk: [
                {
                    id: 2,
                    purchasePrice: 599.99,
                    sellingPrice: 799.99,
                    quantity: 1,
                    subtotal: 799.99,
                },
                {
                    id: 3,
                    purchasePrice: 399.99,
                    sellingPrice: 599.99,
                    quantity: 2,
                    subtotal: 1199.98,
                }
            ]
        },
    ];

    // Andrea add get methods
    getTransactionToday(): Transactions[] {
        var result: Transactions[] = [];
        var today = new Date();
        for (let i in this.transactions) {
            let date = this.transactions[i].tanggal;
            if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                result.push(this.transactions[i]);
            }
        }
        return result;
    }
    getTransactionFiltered(filterMonth: number, filterYear: number): Transactions[] {
        var result: Transactions[] = [];
        for (let i in this.transactions) {
            let month = this.transactions[i].tanggal.getMonth();
            let year = this.transactions[i].tanggal.getFullYear();
            if (month == filterMonth && year == filterYear) {
                result.push(this.transactions[i]);
            }
        }
        return result;
    }
    getTransactionById(id: number) {
        for (let i in this.transactions) {
            if (this.transactions[i].id == id) {
                return this.transactions[i];
            }
        }
        return null;
    }

    // Andrea add method utk hitung pendapatan, jumlah transaksi, keuntungan di hari ini atau periode tertentu
    countRevenue(forToday: boolean, filterMonth: number = -1, filterYear: number = -1): number {
        let total = 0;
        if (forToday) {
            const today = new Date();
            for (let i in this.transactions) {
                let date = this.transactions[i].tanggal;
                if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                    total += this.transactions[i].totalTransaksi;
                }
            }
        }
        else {
            for (let i in this.transactions) {
                let date = this.transactions[i].tanggal;
                if (date.getMonth() == filterMonth && date.getFullYear() == filterYear) {
                    total += this.transactions[i].totalTransaksi;
                }
            }
        }
        return total;
    }
    countNumberOfTransactions(forToday: boolean, filterMonth: number = -1, filterYear: number = -1): number {
        let count = 0;
        if (forToday) {
            const today = new Date();
            for (let i in this.transactions) {
                let date = this.transactions[i].tanggal;
                if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                    count++;
                }
            }
        }
        else {
            for (let i in this.transactions) {
                let date = this.transactions[i].tanggal;
                if (date.getMonth() == filterMonth && date.getFullYear() == filterYear) {
                    count++;
                }
            }
        }
        return count;
    }
    countProfit(forToday: boolean, filterMonth: number = -1, filterYear: number = -1) {
        let profit = 0;
        if (forToday) {
            const today = new Date();
            for (let i in this.transactions) {
                let date = this.transactions[i].tanggal;
                if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                    for (let j in this.transactions[i].produk) {
                        let product = this.transactions[i].produk[j];
                        profit += (product.sellingPrice - product.purchasePrice) * product.quantity;
                    }
                }
            }
        }
        else {
            for (let i in this.transactions) {
                let date = this.transactions[i].tanggal;
                if (date.getMonth() == filterMonth && date.getFullYear() == filterYear) {
                    for (let j in this.transactions[i].produk) {
                        let product = this.transactions[i].produk[j];
                        profit += (product.sellingPrice - product.purchasePrice) * product.quantity;
                    }
                }
            }
        }
        return profit;
    }

    // Andrea add method utk ambil produk terlaris hr ini dan all time
    getBestSellingProduct(isAllTime: boolean): { productId: number, totalQty: number } {
        let recapProductQty: any[] = [];
        let product;
        let isFound: boolean = false;
        if (isAllTime) {
            for (let i in this.transactions) {
                for (let j in this.transactions[i].produk) {
                    product = this.transactions[i].produk[j];
                    isFound = false;
                    for (let k in recapProductQty) {
                        if (recapProductQty[k].id == product.id) {
                            recapProductQty[k].qty += product.quantity;
                            isFound = true;
                            continue;
                        }
                    }
                    if (!isFound) {
                        recapProductQty.push(
                            {
                                id: product.id,
                                qty: product.quantity
                            }
                        )
                    }
                }
            }
        }
        // else untuk cari produk terlaris hr ini
        else {
            const today = new Date();
            for (let i in this.transactions) {
                let date = this.transactions[i].tanggal;
                if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                    for (let j in this.transactions[i].produk) {
                        product = this.transactions[i].produk[j];
                        isFound = false;
                        for (let k in recapProductQty) {
                            if (recapProductQty[k].id == product.id) {
                                recapProductQty[k].qty += product.quantity;
                                isFound = true;
                                continue;
                            }
                        }
                        if (!isFound) {
                            recapProductQty.push(
                                {
                                    id: product.id,
                                    qty: product.quantity
                                }
                            )
                        }
                    }
                }
            }
        }
        // Cari max
        let max = recapProductQty[0];
        for (let i = 1; i < recapProductQty.length; i++) {
            if (recapProductQty[i].qty > max.qty) {
                max = recapProductQty[i];
            }
        }
        let result = {
            productId: max.id,
            totalQty: max.qty
        }
        return result;
    }

    //abi add method tambah ke Produk
    addToProduct(p_id: number, p_purchasePrice: number,
        p_sellingPrice: number, p_quantity: number, p_subtotal: number,) {
            let productAdded = false;
            let stockNow = this.transactions
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].isCompleted == false) {
                //cek apakah produk sudah ada
                for (let j = 0; j < this.transactions[i].produk.length; j++) {
                    if (this.transactions[i].produk[j].id == p_id) {
                        productAdded = true;
                        this.transactions[i].produk[j].quantity += p_quantity
                        this.transactions[i].produk[j].subtotal += p_subtotal;
                    }
                }
                if(!productAdded){
                     this.transactions[i].produk.push(
                            {
                                id: p_id,
                                purchasePrice: p_purchasePrice,
                                sellingPrice: p_sellingPrice,
                                quantity: p_quantity,
                                subtotal: p_subtotal
                            });
                }
                console.log(this.transactions[i]);
                console.log(this.transactions[i].produk);
                break;
            }
        }
    }
    initializeTransaction() {
        let lastId = this.transactions[this.transactions.length - 1].id;
        let isTransaksiActive = false;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].isCompleted == false) {
                isTransaksiActive = true;
                break;
            }
        }
        if (!isTransaksiActive) {
            this.transactions.push(
                {
                    id: lastId + 1,
                    tanggal: new Date(),
                    totalTransaksi: 0,
                    isCompleted: false,
                    produk: []
                })
        }

    }
}
