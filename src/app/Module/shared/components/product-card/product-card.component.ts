import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product:any

  constructor(private router:Router){}

  navigate() {
    this.router.navigate([`product-details/${this.product.id}`])
  }

}
