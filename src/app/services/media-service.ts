import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { MediaApiResponse, MovieDetailsResponse } from '../models/media-api-response';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  public selectPopularMovieMedia(pageNumber: number = 1) {
    const popularUrl = `${this.baseUrl}/movie/popular?language=pt-BR&page=${pageNumber}`;

    return this.http
      .get<MediaApiResponse>(popularUrl, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map(this.mapListImages));
  }

  public selectTopRatedMovieMedia(pageNumber: number = 1) {
    const topRatedMovieUrl = `${this.baseUrl}/movie/top_rated?language=pt-BR&page=${pageNumber}`;

    return this.http
      .get<MediaApiResponse>(topRatedMovieUrl, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map(this.mapListImages));
  }

  public selectNowPlayingMovieMedia(pageNumber: number = 1) {
    const nowPlayingUrl = `${this.baseUrl}/movie/now_playing?language=pt-BR&page=${pageNumber}`;

    return this.http
      .get<MediaApiResponse>(nowPlayingUrl, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map(this.mapListImages));
  }

  public searchMovieMedia(query: string, pageNumber: number = 1) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&language=pt-BR&page=${pageNumber}`;

    return this.http
      .get<MediaApiResponse>(searchUrl, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map(this.mapListImages));
  }

  public selectMovieDetails(movieId: number): Observable<MovieDetailsResponse> {
    const url = `${this.baseUrl}/movie/${movieId}`;
    const params = new HttpParams()
      .set('language', 'pt-BR')
      .set('append_to_response', 'credits,videos');

    return this.http
      .get<MovieDetailsResponse>(url, { headers: { Authorization: environment.apiKey }, params })
      .pipe(map(this.mapDetailImages));
  }

  private readonly withBackdropPoster = <
    T extends { poster_path: string | null; backdrop_path: string | null },
  >(
    x: T,
  ): T => ({
    ...x,
    poster_path: x.poster_path ? `https://image.tmdb.org/t/p/w500${x.poster_path}` : null,
    backdrop_path: x.backdrop_path ? `https://image.tmdb.org/t/p/original${x.backdrop_path}` : null,
  });

  private readonly withImages = <
    T extends { poster_path: string | null; backdrop_path: string | null },
  >(
    x: T,
  ): T => ({
    ...x,
    poster_path: x.poster_path ? `https://image.tmdb.org/t/p/w500${x.poster_path}` : null,
    backdrop_path: x.backdrop_path ? `https://image.tmdb.org/t/p/original${x.backdrop_path}` : null,
  });

  private readonly mapListImages = (x: MediaApiResponse): MediaApiResponse => ({
    ...x,
    results: x.results.map((y) => this.withImages(y)),
  });

  private readonly mapDetailImages = (movie: MovieDetailsResponse): MovieDetailsResponse => {
    const mapped = this.withBackdropPoster(movie);
    const mappedCredits = movie.credits
      ? {
          cast: movie.credits.cast.map((c) => ({
            ...c,
            profile_path: c.profile_path
              ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
              : null,
          })),
          crew: movie.credits.crew.map((c) => ({
            ...c,
            profile_path: c.profile_path
              ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
              : null,
          })),
        }
      : undefined;
    return { ...mapped, credits: mappedCredits };
  };
}
