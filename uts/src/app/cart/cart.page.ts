import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { producerNotifyConsumers } from '@angular/core/primitives/signals';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  products: any[]=[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.product;
  }

}
