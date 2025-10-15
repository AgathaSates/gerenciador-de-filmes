import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaApiResponse } from '../../models/media-api-response';
import { CardMovie } from '../card-movie/card-movie';

@Component({
  selector: 'highlights-home-page',
  imports: [AsyncPipe, CardMovie],
  template: `
    <div class="px-5 py-4">
      <div class="text-center">
        <h2 class="fs-1 gradient-title">{{ sectionTitle }}</h2>
      </div>

      <div class="row flex-nowrap overflow-x-scroll g-3 mt-1 px-1 app-scrollbar">
        @for (media of (contentList | async)?.results; track media.id) {
          <div class="col-7 col-lg-3 col-xl-2 pb-4 pt-3">
            <card-movie [media]="media"></card-movie>
          </div>
        }
      </div>
    </div>
  `,
})
export class HighlightsHomePage {
  @Input({ required: true }) public sectionTitle!: string;
  @Input({ required: true }) public contentList!: Observable<MediaApiResponse>;
}
