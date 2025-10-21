import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  {
    path: 'home-page',
    loadComponent: () => import('./components/home-page/home-page').then((c) => c.HomePage),
  },
  {
    path: 'list-page/:category',
    loadComponent: () => import('./components/list-page/list-page').then((m) => m.ListPage),
  },
  {
    path: 'movie-details/:id',
    loadComponent: () =>
      import('./components/movie-details/movie-details').then((m) => m.MovieDetails),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
