import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../transaction-service';
import { ProductService } from '../../product-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {
  transaction:any;
  productDetail:any[] = []; // menampung detail produk (nama produk, gambar, dll)
  adaData:boolean = false;

  constructor(private route:ActivatedRoute, private transactionservice:TransactionService, private productservice:ProductService) { }

  id = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    // Ambil transaksi berdasarkan id
    this.transaction = this.transactionservice.getTransactionById(this.id);
    if (this.transaction == null){
      this.adaData = false;
    }
    else{
      this.adaData = true;
    }

    // Ambil detail produk yg sesuai berdasarkan id item transaksi
    for (let i in this.transaction.produk){
      let id = this.transaction.produk[i].id;
      let product = this.productservice.getProductById(id)
      this.productDetail.push(product);
    }
  }

  formatDate(tanggal:Date):string{
    const arrBulan:string[] = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const hari = tanggal.getDate();
    const bulan = tanggal.getMonth();
    const tahun = tanggal.getFullYear();
    return hari + " " + arrBulan[bulan] + " " + tahun;
  }

  countItemsQtyTotal():number{
    let total = 0;
    for (let i in this.transaction.produk){
      total += this.transaction.produk[i].quantity;
    }
    return total;
  }
}
