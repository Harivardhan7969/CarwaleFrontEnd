import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { tokenInterceptorFn } from './core/interceptors/token.interceptor.fn';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),

  provideRouter(routes), provideHttpClient(withInterceptors([tokenInterceptorFn])), provideAnimationsAsync(),

  ]
};
