import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: false,
})
export class CreatePage implements OnInit {
  namaProduk: string = '';
  hargaBeli: number = 0;
  hargaJual: number = 0;
  stock: number = 0;
  imageUrl: string = '';
  deskripsi: string = '';
  selectedKategori: number = -1;

  kategoriList: any[] = [];

  isFirstNamaProduk: boolean = true;
  isFirstDeskripsi: boolean = true;
  isFirstKategori: boolean = true;

  setIsFirstNamaProduk() {
    this.isFirstNamaProduk = false;
  }

  setIsFirstDeskripsi() {
    this.isFirstDeskripsi = false;
  }

  setIsFirstKategori() {
    this.isFirstKategori = false;
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }
    this.kategoriList = this.productService.kategori;
  }

  createProduct() {
    if (this.namaProduk == '') {
      alert('Nama Produk Tidak Boleh Kosong');
    } else if (this.deskripsi == '') {
      alert('Deskripsi Tidak Boleh Kosong!');
    } else if (this.hargaBeli < 0) {
      alert('Harga Beli Tidak Boleh Negatif');
    } else if (this.hargaJual < 0) {
      alert('Harga Jual Tidak Boleh Negatif');
    } else if (this.stock < 0) {
      alert('Stok Tidak Boleh Negatif');
    } else if (this.selectedKategori == -1 || this.selectedKategori == null) {
      alert('Kategori Harus Dipilih');
    } else {
      this.productService.addProduct(
        this.namaProduk,
        this.deskripsi,
        this.hargaBeli,
        this.hargaJual,
        this.stock,
        this.imageUrl,
        this.selectedKategori
      );
      this.router.navigate(['/product']);
    }
  }

  checkProductLink(imageUrlQuery: string): boolean {
    const url =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;
    if (imageUrlQuery == '') {
      return true;
    } else {
      return url.test(imageUrlQuery);
    }
  }
}
