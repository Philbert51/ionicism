import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {
  products: any[] = [];
  originalProductList: any[] = [];

  searchQuery: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.products = this.productService.product;
    this.originalProductList = this.productService.product;
  }

  searchProduct() {
    if (!this.searchQuery || this.searchQuery.trim() == '') {
      this.products = this.originalProductList;
    } else {
      this.products = this.productService.searchProduct(this.searchQuery);
    }
  }

  deleteProduct(id: number){
    if(confirm('Apakah Anda Yakin Ingin Menghapus Data Tersebut?')){
      this.productService.deleteProduct(id);
      this.products = this.productService.product;
      this.originalProductList = this.productService.product;
    }
  }
  
  displayDetail(id: number){
    alert("meow")
  }
}
