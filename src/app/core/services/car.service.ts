import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppConstants } from '../constants/app.constants';
import { BrandDto } from '../../shared/models/brand.dto';
import { CategoryDto } from '../../shared/models/category.dto';
import { map } from 'rxjs';

export interface Brand {
  id: number;
  name: string;
  isFeatured: boolean;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  addCar(carDto: any) {

    return this.http.post(`${AppConstants.API_URL}/cars`, carDto);
  }


  createBrand(brandDto: BrandDto) {

    return this.http.post<any>(`${AppConstants.API_URL}/brands`, brandDto);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>('http://localhost:8080/api/image-upload', formData);
  }

  createCategory(categoryDto: CategoryDto) {

    return this.http.post<any>('http://localhost:8080/api/categories', categoryDto);
  }

  getAllBrands() {
    return this.http.get<any>('http://localhost:8080/api/brands');
  }

  deleteBrand(id: number) {
    return this.http.delete<any>(`http://localhost:8080/api/brands/${id}`)
  }

  getBrandById(id: number) {
    return this.http.get<any>(`http://localhost:8080/api/brands/${id}`)
  }

  updateBrand(id: number, brandDto: any) {
    return this.http.put<any>(`${AppConstants.API_URL}/brands/${id}`, brandDto);
  }


  getAllCategories() {
    return this.http.get<any>('http://localhost:8080/api/categories');
  }

  deleteCategory(id: number) {

    return this.http.delete(`http://localhost:8080/api/categories/${id}`);
  }

  updateCategory(id: number, categoryDto: any) {
    return this.http.put<any>(`http://localhost:8080/api/categories/${id}`, categoryDto);
  }

  getCategoryById(id: number) {
    return this.http.get<any>(`http://localhost:8080/api/categories/${id}`);
  }

}
