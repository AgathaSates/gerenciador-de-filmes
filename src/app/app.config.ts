import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomePage } from './components/home-page/home-page';
import { ListPage } from './components/list-page/list-page';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePage },
  { path: 'list-page/:category', component: ListPage },
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
