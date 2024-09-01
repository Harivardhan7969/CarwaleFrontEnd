import { Component } from '@angular/core';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CarProductComponent } from '../car-product/car-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingPageComponent, FooterComponent, CarProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
