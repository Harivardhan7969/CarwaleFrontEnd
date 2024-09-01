import { Component, inject } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarDto } from '../../../shared/models/car.dto';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [NgIf, CurrencyPipe, RouterLink],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {

  dataService: DataService = inject(DataService);
  route: ActivatedRoute = inject(ActivatedRoute);
  id!: number;
  car: any;
  constructor() {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dataService.getCarById(this.id).subscribe(response => {
        console.log(response);
        this.car = response.data;
      });
    })
  }
}
