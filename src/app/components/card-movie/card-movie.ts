import { Component, Input } from '@angular/core';
import { Media } from '../../models/media-api-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-movie',
  imports: [RouterLink],
  template: `
    <a class="text-decoration-none" [routerLink]="['/movie-details', media.id]"
      ><div class="card rounded-3 content-card">
        <img
          class="card-img-top rounded-3 poster-card"
          [src]="media.poster_path"
          [alt]="media.title ?? media.name"
        />
        <div class="card-body text-center d-flex flex-column justify-content-end">
          <small class="text-muted">{{ media.release_date ?? media.first_air_date }}</small>
          <p class="fw-bold card-title">
            {{ (media.title ?? media.name)?.slice(0, 38) }}
          </p>
          <small class="pt-1">{{ voteAverageInteger }}/10</small>
        </div>
      </div></a
    >
  `,
})
export class CardMovie {
  @Input({ required: true }) public media!: Media;

  public get voteAverageInteger(): number {
    return Math.trunc(this.media?.vote_average ?? 0);
  }
}
