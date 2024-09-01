import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarService } from '../../../../core/services/car.service';
import { CarDto } from '../../../../shared/models/car.dto';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-add-car-details',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, ReactiveFormsModule, NgFor],
  templateUrl: './add-car-details.component.html',
  styleUrl: './add-car-details.component.css'
})
export class AddCarDetailsComponent {



  carService: CarService = inject(CarService);
  imageSrc: string | ArrayBuffer | null = null;
  sellerForm!: FormGroup;
  imageUrl: string = '';
  id: any;
  categories: any;
  brands: any;
  authService: AuthService = inject(AuthService);
  constructor(private fb: FormBuilder) {
    this.sellerForm = this.fb.group({
      carname: ['', Validators.required],
      carNumber: ['', Validators.required],
      carModel: ['', Validators.required],
      carImage: ['', Validators.required],
      fuelType: ['', Validators.required],
      currentLocation: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{5,6}$')]],
      description: [''],
      contact: [''],
      price: [''],
      brand: [''],
      category: ['']
    });
    console.log("inside add car constructor=============" + this.authService.sellerId);

    this.carService.getAllCategories().subscribe(
      response => {
        console.log("all categories=========" + response.data);
        this.categories = response.data;
        console.log(this.categories);
      })

    this.carService.getAllBrands().subscribe(response => {
      console.log(response.data);
      this.brands = response.data;
      console.log("brandss============" + this.brands);
    })

  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.sellerForm.valid) {
      console.log(this.sellerForm.value);
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0]
    this.carService.uploadImage(file).subscribe(
      response => {
        this.imageUrl = response.data.imageUrl;
        console.log(this.imageUrl);

      }
    )
  }



  addCar() {

    let carDto: CarDto = {
      name: this.sellerForm.value.carname,
      price: this.sellerForm.value.price,
      model: this.sellerForm.value.carModel,
      fuelType: this.sellerForm.value.fuelType,
      contact: this.sellerForm.value.contact,
      currentLocation: this.sellerForm.value.currentLocation,
      pincode: this.sellerForm.value.pinCode,
      description: this.sellerForm.value.description,
      carNumber: this.sellerForm.value.carNumber,
      image: this.imageUrl,
      brand: this.sellerForm.value.brand,
      category: this.sellerForm.value.category
    }

    this.carService.addCar(carDto).subscribe({
      next: (response) => {
        console.log("success response");

        console.log(response);

      },
      error: (error) => {
        console.log("error response");
        console.log(error);

      }
    }

    )

  }


}
