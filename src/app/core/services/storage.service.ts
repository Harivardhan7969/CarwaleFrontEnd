
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';


@Injectable({ providedIn: 'root' })
export class StorageService {

    platformId: Object = inject(PLATFORM_ID);

    constructor() {

    }
    setUserToken(value: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem("userToken", value);
        }

    }
    getUserToken() {
        if (isPlatformBrowser(this.platformId)) {
            console.log("get User token ");
            console.log(localStorage.getItem("userToken"));
            return localStorage.getItem("userToken");
        } else {
            return null;
        }
    }

    clearUserToken() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem("userToken");
        }
    }




}