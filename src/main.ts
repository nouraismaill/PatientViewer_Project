import { bootstrapApplication } from '@angular/platform-browser';

import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log('[Outgoing Request]');
  console.log(request);
  return next(request);
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptors([loggingInterceptor])),
  ],
}).catch((err) => console.error(err));
