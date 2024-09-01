import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserAuthDto } from '../../shared/models/user.auth.dto';
import { AppConstants } from '../constants/app.constants';
import { Buyer } from '../../shared/models/buyer';
import { Seller } from '../../shared/models/seller';
import { Admin } from '../../shared/models/admin';
import { Response } from '../../shared/models/response';
import { StorageService } from './storage.service';



type User = Buyer | Seller | Admin | null | undefined;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn: boolean = false;
  userRole: string = "";

  user: User;

  http: HttpClient = inject(HttpClient);
  storageService: StorageService = inject(StorageService);
  sellerId: any;
  constructor() { }

  login(userAuthDto: UserAuthDto) {

    return this.http.post<Response<User>>(`${AppConstants.API_URL}/login`, userAuthDto);
  }

  register(userAuthDto: UserAuthDto) {
    return this.http.post<Response<User>>(`${AppConstants.API_URL}/register`, userAuthDto);
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
    this.userRole = "";
    this.storageService.clearUserToken();

  }
  //   logout() {
  //     this.isLoggedIn = false;
  //     this.useRole = "";
  //     this.userDetails = null;
  //     this.storageService.deleteToken();
  // }





}
