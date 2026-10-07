import { Service } from '@angular/core';

// one sale, it stays active until the cashier confirms it
interface Transactions {
    id: number; // unique, goes up by one for every new transaction
    tanggal: Date; // date the transaction was created, tanggal means date
    totalTransaksi: number; // sum of all subtotals, only filled in when the transaction is confirmed
    isCompleted: boolean; // false means this is the active cart
    // produk: [
    //     {
    //         id: number,
    //         quantity: number,
    //         subtotal: number,
    //     }
    // ];
    // Andrea edit from Abi
    produk: Product[]; // items bought in this transaction
}

// Andrea edit
interface Product {
    id: number, // product id, links to the product service
    purchasePrice: number, // price the shop paid, used for profit
    sellingPrice: number, // price the customer pays
    quantity: number, // how many were bought
    subtotal: number, // selling price times quantity
}

// shared by every page that injects it, so all pages see the same transactions
@Service()
export class TransactionService {
    transactions: Transactions[] = [
        {
            // Tahun lalu
            id: 1,
            tanggal: new Date('2025-08-17T07:15:00'),
            totalTransaksi: 24500,
            isCompleted: true,
            produk: [
                {
                    id: 1, // Indomie
                    purchasePrice: 2800,
                    sellingPrice: 3500,
                    quantity: 5,
                    subtotal: 17500,
                },
                {
                    id: 4, // Aqua 600ml
                    purchasePrice: 2500,
                    sellingPrice: 3500,
                    quantity: 2,
                    subtotal: 7000,
                }
            ]
        },
        {
            id: 2,
            tanggal: new Date('2025-10-25T09:30:00'),
            totalTransaksi: 21000,
            isCompleted: true,
            produk: [
                {
                    id: 2, // Roti Aoka
                    purchasePrice: 2200,
                    sellingPrice: 3000,
                    quantity: 3,
                    subtotal: 9000,
                },
                {
                    id: 5, // Teh Pucuk
                    purchasePrice: 3200,
                    sellingPrice: 4000,
                    quantity: 3,
                    subtotal: 12000,
                }
            ]
        },
        {
            id: 3,
            tanggal: new Date('2025-10-29T12:45:00'),
            totalTransaksi: 15000,
            isCompleted: true,
            produk: [
                {
                    id: 6, // Kopi Kapal Api
                    purchasePrice: 1100,
                    sellingPrice: 1500,
                    quantity: 10,
                    subtotal: 15000,
                }
            ]
        },
        {
            id: 4,
            tanggal: new Date('2025-11-11T15:20:00'),
            totalTransaksi: 46500,
            isCompleted: true,
            produk: [
                {
                    id: 3, // Roma Kelapa
                    purchasePrice: 10500,
                    sellingPrice: 12000,
                    quantity: 2,
                    subtotal: 24000,
                },
                {
                    id: 13, // Tolak Angin
                    purchasePrice: 3800,
                    sellingPrice: 4500,
                    quantity: 5,
                    subtotal: 22500,
                }
            ]
        },
        // Bulan lalu
        {
            id: 5,
            tanggal: new Date('2026-09-07T08:10:00'),
            totalTransaksi: 67000,
            isCompleted: true,
            produk: [
                {
                    id: 8, // Lampu Philips
                    purchasePrice: 30000,
                    sellingPrice: 35000,
                    quantity: 1,
                    subtotal: 35000,
                },
                {
                    id: 7, // Baterai ABC
                    purchasePrice: 13000,
                    sellingPrice: 16000,
                    quantity: 2,
                    subtotal: 32000,
                }
            ]
        },
        {
            id: 6,
            tanggal: new Date('2026-09-13T11:00:00'),
            totalTransaksi: 45000,
            isCompleted: true,
            produk: [
                {
                    id: 9, // Laci Plastik
                    purchasePrice: 35000,
                    sellingPrice: 45000,
                    quantity: 1,
                    subtotal: 45000,
                }
            ]
        },
        {
            id: 7,
            tanggal: new Date('2026-09-13T14:30:00'),
            totalTransaksi: 23500,
            isCompleted: true,
            produk: [
                {
                    id: 10, // Sapu Ijuk
                    purchasePrice: 15000,
                    sellingPrice: 20000,
                    quantity: 1,
                    subtotal: 20000,
                },
                {
                    id: 4, // Aqua
                    purchasePrice: 2500,
                    sellingPrice: 3500,
                    quantity: 1,
                    subtotal: 3500,
                }
            ]
        },
        {
            id: 8,
            tanggal: new Date('2026-09-17T16:45:00'),
            totalTransaksi: 32500,
            isCompleted: true,
            produk: [
                {
                    id: 11, // Buku Tulis
                    purchasePrice: 3500,
                    sellingPrice: 4500,
                    quantity: 5,
                    subtotal: 22500,
                },
                {
                    id: 12, // Pulpen
                    purchasePrice: 1200,
                    sellingPrice: 2000,
                    quantity: 5,
                    subtotal: 10000,
                }
            ]
        },
        // Bulan ini
        {
            id: 9,
            tanggal: new Date('2026-10-01T19:15:00'), // Malam hari
            totalTransaksi: 13000,
            isCompleted: true,
            produk: [
                {
                    id: 14, // Paramex
                    purchasePrice: 2200,
                    sellingPrice: 3000,
                    quantity: 2,
                    subtotal: 6000,
                },
                {
                    id: 4, // Aqua
                    purchasePrice: 2500,
                    sellingPrice: 3500,
                    quantity: 2,
                    subtotal: 7000,
                }
            ]
        },
        {
            id: 10,
            tanggal: new Date('2026-10-01T06:30:00'),
            totalTransaksi: 57500,
            isCompleted: true,
            produk: [
                {
                    id: 1, // Indomie
                    purchasePrice: 2800,
                    sellingPrice: 3500,
                    quantity: 10,
                    subtotal: 35000,
                },
                {
                    id: 6, // Kapal Api
                    purchasePrice: 1100,
                    sellingPrice: 1500,
                    quantity: 5,
                    subtotal: 7500,
                },
                {
                    id: 2, // Roti Aoka
                    purchasePrice: 2200,
                    sellingPrice: 3000,
                    quantity: 5,
                    subtotal: 15000,
                }
            ]
        },
        {
            id: 11,
            tanggal: new Date('2026-10-02T09:10:00'),
            totalTransaksi: 8000,
            isCompleted: true,
            produk: [
                {
                    id: 5, // Teh Pucuk
                    purchasePrice: 3200,
                    sellingPrice: 4000,
                    quantity: 2,
                    subtotal: 8000,
                }
            ]
        },
        {
            id: 12,
            tanggal: new Date('2026-10-03T10:45:00'),
            totalTransaksi: 16000,
            isCompleted: true,
            produk: [
                {
                    id: 7, // Baterai ABC
                    purchasePrice: 13000,
                    sellingPrice: 16000,
                    quantity: 1,
                    subtotal: 16000,
                }
            ]
        },
        // Hari ini (ubah ke tanggal hari ini untuk testing dashboard dan daftar riwayat hari ini)
        {
            id: 13,
            tanggal: new Date('2026-10-07T12:00:00'),
            totalTransaksi: 45000,
            isCompleted: true,
            produk: [
                {
                    id: 11, // Buku Tulis
                    purchasePrice: 3500,
                    sellingPrice: 4500,
                    quantity: 10,
                    subtotal: 45000,
                }
            ]
        },
        {
            id: 14,
            tanggal: new Date('2026-10-07T13:20:00'),
            totalTransaksi: 15500,
            isCompleted: true,
            produk: [
                {
                    id: 13, // Tolak Angin
                    purchasePrice: 3800,
                    sellingPrice: 4500,
                    quantity: 2,
                    subtotal: 9000,
                },
                {
                    id: 14, // Paramex
                    purchasePrice: 2200,
                    sellingPrice: 3000,
                    quantity: 1,
                    subtotal: 3000,
                },
                {
                    id: 4, // Aqua
                    purchasePrice: 2500,
                    sellingPrice: 3500,
                    quantity: 1,
                    subtotal: 3500,
                }
            ]
        },
        {
            id: 15,
            tanggal: new Date('2026-10-07T15:05:00'),
            totalTransaksi: 16000,
            isCompleted: true,
            produk: [
                {
                    id: 3, // Roma Kelapa
                    purchasePrice: 10500,
                    sellingPrice: 12000,
                    quantity: 1,
                    subtotal: 12000,
                },
                {
                    id: 5, // Teh Pucuk
                    purchasePrice: 3200,
                    sellingPrice: 4000,
                    quantity: 1,
                    subtotal: 4000,
                }
            ]
        }
    ];


    // Andrea add get methods
    getTransactionToday(): Transactions[] {
        // returns only the transactions made today
        var result: Transactions[] = [];
        var today = new Date();
        for (let i in this.transactions) {
            // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
            if (this.transactions[i].isCompleted) {
                let date = this.transactions[i].tanggal;

                // day, month and year must all match, checking only the day would also match other months
                if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                    result.push(this.transactions[i]);
                }
            }
        }
        return result;
    }
    getTransactionFiltered(filterMonth: number, filterYear: number): Transactions[] {
        // returns the transactions of one month and year
        // warning: the month is zero based, so january is 0
        var result: Transactions[] = [];
        for (let i in this.transactions) {
            // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
            if (this.transactions[i].isCompleted) {
                let month = this.transactions[i].tanggal.getMonth();
                let year = this.transactions[i].tanggal.getFullYear();
                if (month == filterMonth && year == filterYear) {
                    result.push(this.transactions[i]);
                }
            }
        }
        return result;
    }
    getTransactionById(id: number) {
        // loose comparison, so a string id coming from the route still matches a number id
        for (let i in this.transactions) {
            if (this.transactions[i].id == id) {
                return this.transactions[i];
            }
        }
        return null; // no transaction has this id
    }

    // Andrea add method utk hitung pendapatan, jumlah transaksi, keuntungan di hari ini atau periode tertentu
    countRevenue(forToday: boolean, filterMonth: number = -1, filterYear: number = -1): number {
        // adds up the totals of the transactions in a period
        // when the first flag is true only today counts and the month and year are ignored
        let total = 0;
        if (forToday) {
            const today = new Date();
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    let date = this.transactions[i].tanggal;
                    if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                        total += this.transactions[i].totalTransaksi;
                    }
                }
            }
        }
        // else is the month and year period
        else {
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    let date = this.transactions[i].tanggal;
                    if (date.getMonth() == filterMonth && date.getFullYear() == filterYear) {
                        total += this.transactions[i].totalTransaksi;
                    }
                }
            }
        }
        return total;
    }
    countNumberOfTransactions(forToday: boolean, filterMonth: number = -1, filterYear: number = -1): number {
        // counts the transactions in a period, same period rules as the revenue method
        // warning: the completed flag is never checked, so an unfinished cart counts as a transaction
        let count = 0;
        if (forToday) {
            const today = new Date();
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    let date = this.transactions[i].tanggal;
                    if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                        count++;
                    }
                }
            }
        }
        else {
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    let date = this.transactions[i].tanggal;
                    if (date.getMonth() == filterMonth && date.getFullYear() == filterYear) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    countProfit(forToday: boolean, filterMonth: number = -1, filterYear: number = -1) {
        // profit is selling price minus purchase price, times the quantity, added up over every item
        // warning: the completed flag is never checked, so an unfinished cart is included
        let profit = 0;
        if (forToday) {
            const today = new Date();
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    let date = this.transactions[i].tanggal;
                    if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                        for (let j in this.transactions[i].produk) {
                            let product = this.transactions[i].produk[j];
                            profit += (product.sellingPrice - product.purchasePrice) * product.quantity;
                        }
                    }
                }
            }
        }
        else {
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    let date = this.transactions[i].tanggal;
                    if (date.getMonth() == filterMonth && date.getFullYear() == filterYear) {
                        for (let j in this.transactions[i].produk) {
                            let product = this.transactions[i].produk[j];
                            profit += (product.sellingPrice - product.purchasePrice) * product.quantity;
                        }
                    }
                }
            }
        }
        return profit;
    }

    // Andrea add method utk ambil produk terlaris hr ini dan all time
    // EDIT BARU: betulin bug kalau transaksinya ngga ada
    getBestSellingProduct(isAllTime: boolean) {
        let recapProductQty: any[] = []; // one entry per product, holds the product id and the total quantity sold
        let product;
        let isFound: boolean = false; // true when the product already has an entry in the recap

        // loops over transactions, then items, then the recap list, adding to an existing entry or making a new one
        if (isAllTime) {
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    for (let j in this.transactions[i].produk) {
                        product = this.transactions[i].produk[j];
                        isFound = false;
                        for (let k in recapProductQty) {
                            if (recapProductQty[k].id == product.id) {
                                recapProductQty[k].qty += product.quantity;
                                isFound = true;
                                continue; // only skips to the next entry, the loop still finishes
                            }
                        }

                        // first time this product shows up, so start its entry
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
        // else untuk cari produk terlaris hr ini
        else {
            const today = new Date();
            for (let i in this.transactions) {
                // ambil hanya transaksi yang COMPLETED (bukan status masih cart)
                if (this.transactions[i].isCompleted) {
                    let date = this.transactions[i].tanggal;
                    if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                        for (let j in this.transactions[i].produk) {
                            product = this.transactions[i].produk[j];
                            isFound = false;
                            for (let k in recapProductQty) {
                                if (recapProductQty[k].id == product.id) {
                                    recapProductQty[k].qty += product.quantity;
                                    isFound = true;
                                    continue; // only skips to the next entry, the loop still finishes
                                }
                            }

                            // first time this product shows up, so start its entry
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
        }

        // nothing was sold in this period, so callers must handle null
        if (recapProductQty.length == 0) {
            return null;
        }
        else {
            // Cari max
            let max = recapProductQty[0];
            for (let i = 1; i < recapProductQty.length; i++) {
                if (recapProductQty[i].qty > max.qty) {
                    max = recapProductQty[i];
                }
            }

            // only the product id and quantity are returned, not the name
            let result = {
                productId: max.id,
                totalQty: max.qty
            }
            return result;
        }
    }

    //abi add method tambah ke Produk
    addToProduct(p_id: number, p_purchasePrice: number,
        p_sellingPrice: number, p_quantity: number, p_subtotal: number,) {
        // true when the product is already in the cart
        let productAdded = false;

        // finds the active transaction, the one that is not completed, and works only on it
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].isCompleted == false) {
                //cek apakah produk sudah ada
                for (let j = 0; j < this.transactions[i].produk.length; j++) {
                    if (this.transactions[i].produk[j].id == p_id) {
                        // product already in the cart, so raise its quantity and subtotal instead of adding a second line
                        productAdded = true;
                        this.transactions[i].produk[j].quantity += p_quantity
                        this.transactions[i].produk[j].subtotal += p_subtotal;
                        break;
                    }
                }

                // not found in the cart, so add it as a new line
                if (!productAdded) {
                    this.transactions[i].produk.push(
                        {
                            id: p_id,
                            purchasePrice: p_purchasePrice,
                            sellingPrice: p_sellingPrice,
                            quantity: p_quantity,
                            subtotal: p_subtotal
                        }
                    );
                }
                console.log(this.transactions[i]); // debug output only
                console.log(this.transactions[i].produk);
                break; // only one active transaction exists, so stop after it
            }
        }
    }
    initializeTransaction() {
        // the last transaction has the highest id, so the new id is that plus one
        let lastId = this.transactions[this.transactions.length - 1]?.id ?? 0;
        let isTransaksiActive = false;

        // looks for an unfinished transaction
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].isCompleted == false) {
                isTransaksiActive = true;
                break;
            }
        }

        // no active cart yet, so open a new empty one dated now
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
    deleteProduk(id: number, idTransaksi: number) {
        let transaksi = this.getTransactionById(idTransaksi);
        if(transaksi != null){
            for (let i = 0; i < transaksi.produk.length; i++) {
                if(transaksi.produk[i].id == id){
                    transaksi.produk.splice(i,1);
                    break;
                }
        }
        }
        alert('Data Berhasil Dihapus!');
    }
    confirmTransaction(p_transactionId: number, p_produk: any[]) {
        let activeTransaksi = this.getTransactionById(p_transactionId);
        let length = p_produk.length;
        if (activeTransaksi != null) {
            for (let i = 0; i < length; i++) {
                //activeTransaksi.produk.push(p_produk[i]);
                activeTransaksi.totalTransaksi += p_produk[i].subtotal;
            }
            activeTransaksi.isCompleted = true; // no longer the active cart, the next add creates a new transaction

        }
    }
}
