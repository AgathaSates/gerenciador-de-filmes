import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MediaCategory } from '../../models/media-api-response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'as-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './as-navbar.html',
})
export class AsNavbar {
  public readonly MediaCategory = MediaCategory;

  public inputSearch: string = '';

  constructor(private readonly router: Router) {}

  public onSearch(): void {
    const input: string = this.inputSearch.trim();
    if (!input) return;

    void this.router.navigate(['/list-page', MediaCategory.Search], { queryParams: { q: input } });

    this.inputSearch = '';
  }
}
