import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

    http: HttpClient = inject(HttpClient);

    constructor() {

    }

    getSellerById(id: number) {
        return this.http.get<any>(`http://localhost:8080/api/users/${id}`)
    }

}