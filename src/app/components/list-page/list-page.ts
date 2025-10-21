import { Component, inject } from '@angular/core';
import { Media, MediaApiResponse, MediaCategory } from '../../models/media-api-response';
import {
  combineLatest,
  distinctUntilChanged,
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
    @let search = searchTerm$ | async;
    <div class="text-center">
      <h2 class="fs-1 gradient-title">{{ sectionTitle | async }} {{ search }}</h2>
    </div>

    @let media = contentList | async;

    <div class="row g-3 mt-1 px-1">
      @if (media?.total_results === 0) {
        <div class="col-12">
          <p class="text-center fs-4">Nenhum resultado encontrado para "{{ search }}".</p>
        </div>
      } @else {
        @for (m of media?.results; track m.id) {
          <div class="col-lg-3 col-xl-2 pb-3">
            <card-movie [media]="m"></card-movie>
          </div>
        }
      }
    </div>

    @if (!endPage) {
      <div class="d-flex justify-content-center my-4">
        <button class="btn btn-secondary" (click)="loadMore()">
          <i class="bi bi-arrow-clockwise my-auto me-1"></i> Carregar mais
        </button>
      </div>
    }
  </div>`,
})
export class ListPage {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected readonly mediaService = inject(MediaService);

  public readonly searchTerm$ = this.activatedRoute.queryParamMap.pipe(
    map((q) => (q.get('q') ?? '').trim()),
    distinctUntilChanged(),
  );

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
        case MediaCategory.Search: {
          return 'Resultados da busca por: ';
        }
        default: {
          return 'Filmes Populares';
        }
      }
    }),
  );

  public contentList = combineLatest([
    this.activatedRoute.paramMap,
    this.activatedRoute.queryParamMap,
  ]).pipe(
    switchMap(([params, qp]) => {
      const categoria = params.get('category') as MediaCategory | null;
      const search: string = (qp.get('q') ?? '').trim();

      switch (categoria) {
        case MediaCategory.Popular:
          return this.makePager((page) => this.mediaService.selectPopularMovieMedia(page));
        case MediaCategory.TopRated:
          return this.makePager((page) => this.mediaService.selectTopRatedMovieMedia(page));
        case MediaCategory.NowPlaying:
          return this.makePager((page) => this.mediaService.selectNowPlayingMovieMedia(page));
        case MediaCategory.Search:
          return this.makePager((page) => this.mediaService.searchMovieMedia(search, page));
        default:
          return this.makePager((page) => this.mediaService.selectPopularMovieMedia(page));
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
