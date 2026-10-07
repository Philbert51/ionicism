import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
  standalone: false,
})
export class DetailProductPage implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  id = 0;
  product:any[]=[];
  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    });
    this.product = this.productService.product;
  }

}
