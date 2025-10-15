import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaService } from '../../services/media-service';
import {
  MovieDetailsResponse,
  TmdbCast,
  TmdbCrew,
  TmdbVideo,
} from '../../models/media-api-response';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'movie-details',
  imports: [AsyncPipe],
  templateUrl: 'movie-details.html',
})
export class MovieDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mediaService = inject(MediaService);
  private readonly sanitizer = inject(DomSanitizer);

  public movieDetails$!: Observable<MovieDetailsResponse>;

  ngOnInit(): void {
    const movieIdParam = this.route.snapshot.paramMap.get('id');
    if (!movieIdParam) throw new Error('Filme não encontrado.');
    const movieId = Number(movieIdParam);
    if (Number.isNaN(movieId)) throw new Error('Id inválido.');

    this.movieDetails$ = this.mediaService.selectMovieDetails(movieId);
  }

  public getSafeTrailerUrl(movie: MovieDetailsResponse): SafeResourceUrl | null {
    const list = movie.videos?.results ?? [];
    const pick = (...preds: Array<(v: TmdbVideo) => boolean>) =>
      preds.map((p) => list.find(p)).find(Boolean) ?? null;

    const chosen =
      pick((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
      pick((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
      pick((v) => v.site === 'YouTube');

    if (chosen && chosen.site === 'YouTube') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${chosen.key}?rel=0&modestbranding=1`,
      );
    }

    // (Opcional) Vimeo:
    const vimeo =
      list.find((v) => v.site === 'Vimeo' && v.type === 'Trailer') ??
      list.find((v) => v.site === 'Vimeo');
    if (vimeo) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://player.vimeo.com/video/${vimeo.key}`,
      );
    }

    return null;
  }

  public selectTopCast(movie: MovieDetailsResponse, maxItems: number = 12): TmdbCast[] {
    return [...(movie.credits?.cast ?? [])].sort((a, b) => a.order - b.order).slice(0, maxItems);
  }

  public selectKeyCrew(movie: MovieDetailsResponse): TmdbCrew[] {
    const wanted = new Set([
      'Director',
      'Screenplay',
      'Writer',
      'Story',
      'Producer',
      'Executive Producer',
      'Director of Photography',
      'Editor',
      'Original Music Composer',
    ]);
    const unique = new Map<string, TmdbCrew>();
    for (const c of movie.credits?.crew ?? []) {
      if (wanted.has(c.job) && !unique.has(c.name + c.job)) {
        unique.set(c.name + c.job, c);
      }
    }
    return Array.from(unique.values());
  }
}
