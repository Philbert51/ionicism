import { Service } from '@angular/core';
interface Cart{
    productId: number;
    quantity: number;
    subtotal: number;
}
@Service()
export class CartService {
    cart: Cart[]=[];
    AddToCart( p_productId: number,  p_quantity: number, p_price: number){
    this.cart.push({
      productId: p_productId,
      quantity: p_quantity,
      subtotal: p_price 
    });
   console.log(this.cart);
  }
}
