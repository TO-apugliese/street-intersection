import { Component } from '@angular/core';
import { StreetCrossComponent } from './street-cross/street-cross.component';

@Component({
  standalone: true,
  imports: [StreetCrossComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ui';
}
