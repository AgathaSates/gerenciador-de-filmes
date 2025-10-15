import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaCategory } from '../../models/media-api-response';

@Component({
  selector: 'as-navbar',
  imports: [RouterLink],
  templateUrl: './as-navbar.html',
})
export class AsNavbar {
  public readonly MediaCategory = MediaCategory;
}
