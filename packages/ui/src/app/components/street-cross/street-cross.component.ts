import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-street-cross',
  templateUrl: './street-cross.component.html',
  styleUrl: './street-cross.component.scss',
})
export class StreetCrossComponent {
  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 
}