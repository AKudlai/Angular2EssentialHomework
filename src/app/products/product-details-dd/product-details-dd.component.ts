import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details-dd',
  templateUrl: './product-details-dd.component.html',
  styleUrls: ['./product-details-dd.component.css']
})
export class ProductDetailsDdComponent implements OnInit {

  productDetailsForm: FormGroup;
  public product: Product;
  public editName: string;
  public editPrice: number;
  public editCategory: string;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { product: Product }) => {
      this.product = data.product;
      this.editName = data.product.name;
      this.editPrice = data.product.price;
      this.editCategory = data.product.category;          
      this.productDetailsForm = new FormGroup({
        name: new FormControl(this.editName, [Validators.required, Validators.minLength(4)]),
        price: new FormControl(this.editPrice, Validators.required),
        category: new FormControl(this.editCategory, Validators.required)
        });
      });
  };

  goToProducts() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onSubmit(form) {
    this.product.name = form.value.name;
    this.product.price = form.value.price;
    this.product.category = form.value.category;
    this.goToProducts();
  }
}
