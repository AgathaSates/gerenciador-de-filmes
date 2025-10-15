import { Component } from '@angular/core';
import { AsNavbar } from './components/navbar/as-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [AsNavbar, RouterOutlet],
  templateUrl: './app.html',
})
export class App {}
