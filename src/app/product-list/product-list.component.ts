import { Component } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;

  constructor(private $gaService: GoogleAnalyticsService) {}

  share() {
    this.$gaService.event('shared_product', 'product-list');
    window.alert('The product has been shared!');
  }

  onNotify() {
    this.$gaService.event('notify_product', 'product-list');
    window.alert('You will be notified when the product goes on sale');
  }
}
