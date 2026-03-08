import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ENVIRONMENT } from './core/tokens/environment.token';
import { environment } from '../environments/environment';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
   providers: [
        {
            provide: ENVIRONMENT,
            useValue: environment
        },
        provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
        provideHttpClient(
            withFetch(),
        )
   ]
};
