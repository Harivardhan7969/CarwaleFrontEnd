import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConstants } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class DataService {

    http: HttpClient = inject(HttpClient);
    categories: any;
    constructor() { }

    getLimitedCars(limit: any) {
        return this.http.get<any>(`${AppConstants.API_URL}/cars/limited?limit=${limit}`);
    }

    getAllCategories() {
        return this.http.get<any>('http://localhost:8080/api/categories');
    }

    getAllCars() {
        return this.http.get<any>(`${AppConstants.API_URL}/cars`);
    }

    getCarById(id: number) {
        return this.http.get<any>(`${AppConstants.API_URL}/cars/byId?id=${id}`);
    }


}