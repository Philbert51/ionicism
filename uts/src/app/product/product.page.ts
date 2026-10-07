import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';
import { AnimationController } from "@ionic/angular";

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
  productsLength : number = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private accountService: AccountService,
    private animCtrl: AnimationController
  ) {}

  ngOnInit() {
    if (this.accountService.isLogin == false) {
      this.router.navigate(['/login']);
    }
    this.products = this.productService.product;
    this.originalProductList = this.productService.product;
    this.productsLength = this.productService.getNotDeletedProductCount();
  }

  ionViewDidEnter() {
    if (this.accountService.isLogin == false) {
      this.router.navigate(['/login']);
    }
  }

  searchProduct() {
    if (!this.searchQuery || this.searchQuery.trim() == '') {
      this.products = this.originalProductList;
    } else {
      this.products = this.productService.searchProduct(this.searchQuery);
    }
  }

  getProductCount(): number {
    return this.productService.getNotDeletedProductCount();
  }

  deleteProduct(id: number) {
    // const deletedCard = document.querySelector("#product" + id) as HTMLElement;
    // const animation = this.animCtrl.create().addElement(deletedCard).duration(400).fromTo("transform", "translateX(0%)", "translateX(80%)").easing("ease-out").fromTo("opacity", 1, -1).easing("ease-in");

    if (confirm('Apakah Anda Yakin Ingin Menghapus ' + this.productService.getProductById(id)?.name + "?")) {
      this.productsLength--;
      // animation.play().then(() => {
      //   this.productService.deleteProduct(id);
      //   this.products = this.productService.product;
      //   this.originalProductList = this.productService.product;
      //   deletedCard.remove();
      // });
      this.productService.deleteProduct(id);
      this.products = this.productService.product;
      this.originalProductList = this.productService.product;
    }
  }
}
