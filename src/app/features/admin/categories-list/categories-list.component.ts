import { Component, inject } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryDto } from '../../../shared/models/category.dto';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [NgFor, RouterLink, ReactiveFormsModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  editMode: boolean = false;
  addCategoryForm!: FormGroup;
  categories: any[] = [];
  carService: CarService = inject(CarService);
  formBuilder: FormBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  categoryId!: number;
  category: any;
  imageUrl: string = '';
  constructor() {

    this.getAllCategories();
    this.addCategoryForm = this.formBuilder.group({
      categoryName: [''],
      isFeatured: [''],
      image: ['']
    })
    this.categoryId = this.route.snapshot.params['id'];
  }

  onFileChange(event: any) {
    console.log(event);
    const file = event.target.files[0];
    this.carService.uploadImage(file).subscribe(
      response => {
        console.log(response);
        this.imageUrl = response.data.imageUrl;
      }
    )
    const reader = new FileReader();
    reader.onload = () => {
      this.addCategoryForm.patchValue({ image: reader.result });
    };
    reader.readAsDataURL(file);
  }


  getAllCategories() {
    this.carService.getAllCategories().subscribe(
      response => {
        console.log(response);
        this.categories = response
      }
    )
  }

  deletecategory(id: number) {
    this.carService.deleteCategory(id).subscribe({
      next: (response) => {
        console.log(response);
        this.getAllCategories();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  getCategoryToUpdate(id: number) {

    this.carService.getCategoryById(id).subscribe(
      response => {
        console.log(response);
        this.editMode = true;
        this.category = response;
        this.categoryId = response.data.id;
        console.log(this.categoryId);
        this.addCategoryForm.patchValue({
          categoryName: response.data.name,
          isFeatured: response.data.isFeatured,
          image: response.data.image.url
        });
      }
    )


  }

  addOrUpdateCategory() {
    if (this.editMode === true) {
      let categoryDto: CategoryDto = {
        name: this.addCategoryForm.value.categoryName,
        isFeatured: this.addCategoryForm.value.isFeatured
      }
      this.carService.updateCategory(this.categoryId, categoryDto).subscribe(
        response => {
          console.log(response);
          console.log(this.categoryId);
          this.getAllCategories();
          this.addCategoryForm.reset();
          this.editMode = false;
        }
      )
    } else {
      let categoryDto: CategoryDto = {
        name: this.addCategoryForm.value.categoryName,
        imageUrl: this.imageUrl,
        isFeatured: this.addCategoryForm.value.isFeatured
      }
      this.carService.createCategory(categoryDto).subscribe(
        response => {
          console.log(response);
          this.getAllCategories();
          this.addCategoryForm.reset();
        }
      )
    }

  }
}
