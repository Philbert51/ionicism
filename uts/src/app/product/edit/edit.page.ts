import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: false,
})
export class EditPage implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  editId: number = 0;

  namaProduk: string = '';
  hargaBeli: number = 0;
  hargaJual: number = 0;
  stock: number = 0;
  imageUrl: string = '';
  deskripsi: string = '';

  isFirstNamaProduk: boolean = true;
  isFirstDeskripsi: boolean = true;

  setIsFirstNamaProduk() {
    this.isFirstNamaProduk = false;
  }

  setIsFirstDeskripsi() {
    this.isFirstDeskripsi = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.editId = params['id'];

      const product = this.productService.getProductById(this.editId);

      if (product) {
        this.namaProduk = product.name;
        this.deskripsi = product.description;
        this.hargaBeli = product.purchasePrice;
        this.hargaJual = product.sellingPrice;
        this.stock = product.stock;
        this.imageUrl = product.imageUrl || '';
      }
    });
  }

  saveProduct() {
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
    } else {
      this.productService.updateProduct(
        this.editId,
        this.namaProduk,
        this.deskripsi,
        this.hargaBeli,
        this.hargaJual,
        this.stock,
        this.imageUrl,
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
