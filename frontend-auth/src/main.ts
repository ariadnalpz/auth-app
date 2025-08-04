import { bootstrapApplication } from '@angular/platform-browser';
     import { AppComponent } from './app/app.component';
     import { provideRouter } from '@angular/router';
     import { routes } from './app/app.routes';
     import { provideHttpClient } from '@angular/common/http';
     import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
     import { providePrimeNG } from 'primeng/config';
     import Lara from '@primeng/themes/lara';

     bootstrapApplication(AppComponent, {
       providers: [
         provideRouter(routes),
         provideHttpClient(),
         provideAnimationsAsync(),
         providePrimeNG({
           theme: {
             preset: Lara
           }
         })
       ]
     }).catch(err => console.error(err));