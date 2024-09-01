import { Component, inject } from '@angular/core';
import { Brand, CarService } from '../../../core/services/car.service';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrandDto } from '../../../shared/models/brand.dto';


@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [NgFor, RouterLink, ReactiveFormsModule],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css'
})
export class BrandsListComponent {

  addOrUpdateBrandForm!: FormGroup;

  formBuilder: FormBuilder = inject(FormBuilder);


  brands: any;
  carService: CarService = inject(CarService);
  editMode: boolean = false;
  brandId!: number;
  imageUrl: string = '';
  constructor() {
    this.addOrUpdateBrandForm = this.formBuilder.group({
      brandName: [''],
      isFeatured: [''],
      image: ['']
    }

    )
    this.getAllBrands();
  }

  getAllBrands() {
    this.carService.getAllBrands().subscribe(
      response => {
        console.log(response.data);
        this.brands = response.data;
        // console.log(this.brands);
        // response =this.brands.flatMap(({}) => this.brands.map(brand => ({brand})));console.log(response);


      }
    )
  }
  deleteBrand(id: number) {
    this.carService.deleteBrand(id).subscribe({
      next: (response) => {
        console.log('Brand deleted successfully', response);
        this.getAllBrands();
      },
      error: (error) => {
        console.error('Error deleting brand', error);
      }
    })
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.carService.uploadImage(file).subscribe(
      response => {
        console.log(response);
        this.imageUrl = response.data.imageUrl;
        console.log(this.imageUrl);
      }
    )
  }

  getBrandToUpdate(id: number) {
    this.carService.getBrandById(id).subscribe(
      response => {
        console.log(response);
        this.editMode = true;
        this.brandId = response.id;
        console.log("brand Id getBrandToUpdate -------------" + this.brandId);
        this.addOrUpdateBrandForm.patchValue({
          brandName: response.name,
          isFeatured: response.isFeatured
          // image: response.data.image
        })
      })
  }

  addOrUpdateBrand() {
    if (this.editMode === true) {
      let brandDto: BrandDto = {
        brandName: this.addOrUpdateBrandForm.value.brandName,
        isFeatured: this.addOrUpdateBrandForm.value.isFeatured
      }
      console.log("brand Id in addOrUpdateBrand -------------" + this.brandId);
      this.carService.updateBrand(this.brandId, brandDto).subscribe(
        response => {
          console.log(response);
          this.editMode = false;
          this.getAllBrands();
          this.addOrUpdateBrandForm.reset();
        }
      )
    } else {
      let createBrandDto: BrandDto = {
        brandName: this.addOrUpdateBrandForm.value.brandName,
        imageUrl: this.imageUrl,
        isFeatured: this.addOrUpdateBrandForm.value.isFeatured,
      }
      this.carService.createBrand(createBrandDto).subscribe(
        response => {
          console.log(response);
          this.getAllBrands();
          this.addOrUpdateBrandForm.reset();
        }
      )
    }
  }

}
