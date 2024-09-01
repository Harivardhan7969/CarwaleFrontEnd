import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { AppConstants } from '../constants/app.constants';

export const tokenInterceptorFn: HttpInterceptorFn = (req, next) => {

    // if (!AppConstants.PUBLIC_URLS.includes(req.url)) {
    //     const storageService: StorageService = inject(StorageService);

    //     const authToken = storageService.getUserToken();

    //     console.log("interceptor " + authToken);

    //     req = req.clone({
    //         setHeaders: { Authorization: `Bearer ${authToken}` }
    //     });
    // }
    const storageService: StorageService = inject(StorageService);
    const token = storageService.getUserToken();
    console.log(req.url);

    if (!AppConstants.PUBLIC_URLS.includes(req.url)) {

        if (AppConstants.PUBLIC_GET_URLS.includes(req.url)) {

            if (req.method === "GET") {

            } else {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

        } else if (/\/api\/products\/\d+$/.test(req.url)) {

        } else if (req.url.includes('limited')) {

        } else if (req.url.includes('byId')) {

        } else {

            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

    }

    return next(req);

};