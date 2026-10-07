import { Service } from '@angular/core';

// satu baris di daftar keranjang, berisi id produk, jumlah dan subtotal
interface Cart{
    productId: number;
    quantity: number;
    subtotal: number;
}

// service yang menyimpan daftar barang keranjang di memori
@Service()
export class CartService {
    cart: Cart[]=[]; // daftar barang di keranjang, awalnya kosong

    // menambahkan satu barang ke daftar keranjang
    AddToCart( p_productId: number,  p_quantity: number, p_price: number){
    this.cart.push({
      productId: p_productId,
      quantity: p_quantity,
      subtotal: p_price 
    });

   // hanya untuk debug, menampilkan isi keranjang di konsol
   console.log(this.cart);
  }
}
