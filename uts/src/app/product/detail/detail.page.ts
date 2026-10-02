import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {

  constructor(private route: ActivatedRoute, private productService:ProductService) { }

  productId: number = 0;
  product:any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });
    this.product = this.productService.getProductById(this.productId);
  }
}
