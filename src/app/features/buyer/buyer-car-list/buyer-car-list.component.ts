import { Component, inject } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarDto } from '../../../shared/models/car.dto';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-buyer-car-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FormsModule, NgFor, SlicePipe],
  templateUrl: './buyer-car-list.component.html',
  styleUrl: './buyer-car-list.component.css'
})
export class BuyerCarListComponent {

  brands: any;
  cars: CarDto[] = [];
  carsList: any[] = [];
  filteredCars: CarDto[] = [];
  dataService: DataService = inject(DataService);
  carService: CarService = inject(CarService);
  constructor() {
    this.dataService.getAllCars().subscribe(
      response => {
        console.log("=========Buyer cars list=========");
        console.log(response.data);
        this.carsList = response.data;
        this.cars = response.data;
        console.log(this.cars);
        this.filteredCars = [...this.cars];
        console.log(this.filteredCars);

      }
    )

    this.carService.getAllBrands().subscribe(
      response => {
        this.brands = response
      }
    )



  }



  selectedBrand: string = '';
  selectedColor: string = '';
  selectedPriceRange: [number, number] = [0, 1000000];

  filterCars() {
    this.carsList = this.cars.filter(car => {
      console.log(this.filteredCars);

      return (!this.selectedBrand || car.name === this.selectedBrand) &&
        // (!this.selectedColor || car.currentLocation === this.selectedColor) &&
        (car.price >= this.selectedPriceRange[0] && car.price <= this.selectedPriceRange[1]);
    });
  }

}
