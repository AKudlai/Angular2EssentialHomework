import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('productForm') productForm: NgForm;

  public product: Product;
  public editName: string;
  public editPrice: number;
  public editCategory: string;

  public formErrors = {
    'name': '',
    'price': '',
    'category': ''
  };

  public validationMessages = {
    'name': {
      'required': 'Required field.',
      'minlength': 'The value must be at least 4 characters.',
    },
    'price': {
      'required': 'Required field.'
    },
    'category': {
      'required': 'Required field.'
    }
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { product: Product }) => {
      this.product = data.product;
      this.editName = data.product.name;
      this.editPrice = data.product.price;
      this.editCategory = data.product.category;
    });
  }

  ngAfterViewInit() {
    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.productForm) return;
    let form = this.productForm.form;

    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      // form.get - получение элемента управления
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field] += message[key] + ' ';
        }
      }
    }
  }
  saveProduct() {
    this.product.name = this.editName;
    this.product.price = this.editPrice;
    this.product.category = this.editCategory;
    this.goToProducts();
  }

  goToProducts() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
