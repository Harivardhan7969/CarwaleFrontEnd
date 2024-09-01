import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
  carForm: FormGroup;
 
  constructor(private fb: FormBuilder) {
    this.carForm = this.fb.group({
      brandName: ['', Validators.required],
      brandImage: [null],
      isPopular: [false]
    });
  }
 
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.carForm.patchValue({
      brandImage: file
    });
  }
 
  onSubmit() {
    if (this.carForm.valid) {
      const formData = new FormData();
      formData.append('brandName', this.carForm.get('brandName')?.value);
      formData.append('brandImage', this.carForm.get('brandImage')?.value);
      formData.append('isPopular', this.carForm.get('isPopular')?.value);
   console.log(this.carForm.value)
      // Submit the form data to your server
    }
  }
}
