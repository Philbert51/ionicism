import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product-service';
import { Router } from '@angular/router';
import { AccountService } from '../../account-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {

  constructor(private route: ActivatedRoute, private productService:ProductService, private router: Router, private accountService: AccountService) { }

  productId: number = 0;
  product:any;

  ngOnInit() {
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });
    this.product = this.productService.getProductById(this.productId);
  }

  getProductCategoryName(kategoriId: number): string {
    return this.productService.getCategoryNameById(kategoriId);
  }
}
