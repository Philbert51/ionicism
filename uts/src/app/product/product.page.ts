import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {

  products:any[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.product;
  }

}
