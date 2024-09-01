import { Component } from '@angular/core';
import { CarProductComponent } from '../car-product/car-product.component';
import { CarsSlidingComponent } from '../cars-sliding/cars-sliding.component';
import { CarListComponent } from '../../buyer/car-list/car-list.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CarProductComponent, CarsSlidingComponent, CarListComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
