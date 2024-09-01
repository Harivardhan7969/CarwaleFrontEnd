import { Component, inject } from '@angular/core';
import { CategoryDto } from '../../../shared/models/category.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  carForm!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  carService: CarService = inject(CarService);
  imageUrl: string = '';
  imageSrc: string | ArrayBuffer | null | File = null;
  imageToUpload: File | undefined | null;
  isValidImage: boolean = false;
  categoryId!: number;
  category: any;
  constructor() {
    this.carForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: ['']
    });

    this.carService.getCategoryById(this.categoryId).subscribe(
      response => {
        console.log(response);

      }
    )


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
        }
      )
    } else {
      alert('please enter valid image');
    }

  }
}
