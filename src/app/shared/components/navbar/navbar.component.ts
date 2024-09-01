import { NgClass, NgFor } from '@angular/common';
import { Component, Pipe, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRoles } from '../../../core/constants/user.roles';
import { CarService } from '../../../core/services/car.service';
import { DataService } from '../../../core/services/data.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen = false
  authService: AuthService = inject(AuthService);
  brands: any;
  categories: any;
  carService: CarService = inject(CarService);
  dataService: DataService = inject(DataService);
  constructor() {
    this.getAllBrands();

    this.getAllCategories();
  }

  getAllBrands() {
    this.carService.getAllBrands().subscribe(
      response => {
        console.log("nav brar brands " + response);

        this.brands = response.data;
      }
    )
  }

  getAllCategories() {
    this.dataService.getAllCategories().subscribe(response =>
      this.categories = response.data
    )
  }

  isBuyer() {
    return this.authService.userRole == UserRoles.BUYER
  }

  logout() {
    this.authService.logout();
  }
}
