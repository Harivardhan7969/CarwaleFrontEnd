import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { HttpClient } from '@angular/common/http';
import { CategoryDto } from '../../../shared/models/category.dto';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink, NgFor],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  http: HttpClient = inject(HttpClient);
  carForm!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  carService: CarService = inject(CarService);
  imageUrl: string = '';
  imageSrc: string | ArrayBuffer | null | File = null;
  imageToUpload: File | undefined | null;
  isValidImage: boolean = false;
  router: Router = inject(Router);
  constructor() {
    this.carForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: ['']
    });
  }

  onFileChange(event: any) {
    console.log(event);




    const file = event.currentTarget.files[0];

    this.imageToUpload = (event.target as HTMLInputElement).files?.item(0)

    if (this.imageToUpload) {

      if (["image/jpeg", "image/png", "image/svg+xml"].includes(this.imageToUpload.type)) {
        console.log("inside if");

        this.isValidImage = true;
        this.carForm.controls['image'].dirty
        console.log(this.isValidImage);

        this.carService.uploadImage(file).subscribe(
          response => {
            console.log(response);
            this.imageUrl = response.data.imageUrl;
            const input = event.target as HTMLInputElement;
            if (input.files && input.files.length > 0) {
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target && e.target.result) {
                  this.imageSrc = e.target.result;
                } else {
                  this.imageSrc = '';
                }
              };
              reader.readAsDataURL(file);
            }
          }
        )

      }
      else {
        console.log("inside else");
        this.isValidImage = false;
        alert('please enter valid image');
        console.log(this.isValidImage);
      }
    }

  }

  onSubmit() {
    let categoryDto: CategoryDto = {
      name: this.carForm.value.categoryName,
      imageUrl: this.imageUrl,
      isFeatured: this.carForm.value.isFeatured
    }
    if (this.imageUrl) {
      this.carService.createCategory(categoryDto).subscribe(
        response => {

          console.log(response);
          this.router.navigate(['/all-categories'])

        }
      )
    } else {
      alert('please enter valid image');
    }

  }
}
