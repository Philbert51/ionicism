import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage implements OnInit {

  constructor(private productService: ProductService) { }
  products:any[] = [];
  listProduct: any[] = [];
  txtColorConfirm: string = "green";
  ngOnInit( ) {
    this.products = this.productService.product;
  }

  TambahKeKeranjang(){
    
  }
}
