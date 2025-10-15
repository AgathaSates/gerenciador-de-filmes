import { Component, inject } from '@angular/core';
import { MediaService } from '../../services/media-service';
import { HighlightsHomePage } from '../highlights-home-page/highlights-home-page';

@Component({
  selector: 'home-page',
  imports: [HighlightsHomePage],
  templateUrl: 'home-page.html',
})
export class HomePage {
  protected readonly mediaService = inject(MediaService);

  protected readonly popularMovieMedia$ = this.mediaService.selectPopularMovieMedia();
  protected readonly topRatedMovieMedia$ = this.mediaService.selectTopRatedMovieMedia();
  protected readonly nowPlayingMovieMedia$ = this.mediaService.selectNowPlayingMovieMedia();
}
