import { Component, inject } from '@angular/core';
import { Media, MediaApiResponse, MediaCategory } from '../../models/media-api-response';
import {
  exhaustMap,
  filter,
  map,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media-service';
import { CardMovie } from '../card-movie/card-movie';

@Component({
  selector: 'list-page',
  imports: [AsyncPipe, CardMovie],
  template: `<div class="px-5 py-4">
    <div class="text-center">
      <h2 class="fs-1 gradient-title">{{ sectionTitle | async }}</h2>
    </div>

    <div class="row g-3 mt-1 px-1">
      @for (media of (contentList | async)?.results; track media.id) {
        <div class="col-lg-3 col-xl-2 pb-3">
          <card-movie [media]="media"></card-movie>
        </div>
      }
    </div>

    <div class="d-flex justify-content-center my-4">
      <button class="btn btn-secondary" (click)="loadMore()" [disabled]="endPage">
        <i class="bi bi-arrow-clockwise my-auto me-1"></i>
        Carregar mais
      </button>
    </div>
  </div>`,
})
export class ListPage {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected readonly mediaService = inject(MediaService);

  protected readonly popularMovieMedia$ = this.mediaService.selectPopularMovieMedia();
  protected readonly topRatedMovieMedia$ = this.mediaService.selectTopRatedMovieMedia();
  protected readonly nowPlayingMovieMedia$ = this.mediaService.selectNowPlayingMovieMedia();

  private loadMoreClick$ = new Subject<void>();
  private currentPage: number = 1;
  public endPage: boolean = false;

  public sectionTitle: Observable<string> = this.activatedRoute.paramMap.pipe(
    map((params) => {
      const categoryParam: string | null = params.get('category');
      switch (categoryParam as MediaCategory) {
        case MediaCategory.Popular: {
          return 'Filmes Populares';
        }
        case MediaCategory.TopRated: {
          return 'Filmes Melhores avaliados';
        }
        case MediaCategory.NowPlaying: {
          return 'Filmes Em cartaz';
        }
        default: {
          return 'Filmes Populares';
        }
      }
    }),
  );

  public contentList: Observable<MediaApiResponse> = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const categoryParam: string | null = params.get('category');
      switch (categoryParam as MediaCategory) {
        case MediaCategory.Popular: {
          return this.makePager((page) => this.mediaService.selectPopularMovieMedia(page));
        }
        case MediaCategory.TopRated: {
          return this.makePager((page) => this.mediaService.selectTopRatedMovieMedia(page));
        }
        case MediaCategory.NowPlaying: {
          return this.makePager((page) => this.mediaService.selectNowPlayingMovieMedia(page));
        }
        default: {
          return this.makePager((page) => this.mediaService.selectPopularMovieMedia(page));
        }
      }
    }),
  );

  private makePager(
    fetchPage: (pageNumber: number) => Observable<MediaApiResponse>,
  ): Observable<MediaApiResponse> {
    this.currentPage = 1;
    this.endPage = false;

    return this.loadMoreClick$.pipe(
      startWith(void 0),
      filter(() => !this.endPage),
      exhaustMap(() =>
        fetchPage(this.currentPage).pipe(
          tap((response) => {
            this.endPage = response.page >= response.total_pages;
            this.currentPage += 1;
          }),
        ),
      ),
      scan(
        (acc, page) => ({
          page: page.page,
          total_pages: page.total_pages,
          total_results: page.total_results,
          results: [...acc.results, ...page.results],
        }),
        { page: 0, total_pages: 0, total_results: 0, results: [] as Media[] },
      ),
    );
  }

  public loadMore(): void {
    this.loadMoreClick$.next();
  }
}
