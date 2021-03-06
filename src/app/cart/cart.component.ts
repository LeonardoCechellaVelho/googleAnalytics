import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });
  valorTotal = 0;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private $gaService: GoogleAnalyticsService
    ) {}

  onSubmit(): void {
    this.items.forEach(element => {
      try {
        this.$gaService.gtag('product_bought', 'cart', 'Product Bought', element.name);
      } catch (error) {
        console.log(error);
      }
      this.valorTotal = this.valorTotal + element.price;
    });
    try {
      this.$gaService.gtag('total_value', 'cart', 'Total Value', this.valorTotal.toString());
    } catch (error) {
      console.log(error);
    }
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
