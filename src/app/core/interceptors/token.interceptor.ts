import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppConstants } from '../constants/app.constants';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    storageService: StorageService = inject(StorageService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!AppConstants.PUBLIC_URLS.includes(req.url)) {
            const token = this.storageService.getUserToken();

            console.log("token " + token);

            const headers = new HttpHeaders();

            headers.append("Authorization", `Bearer ${token}`);

            req = req.clone({ headers });
        }

        return next.handle(req);
    }
}
